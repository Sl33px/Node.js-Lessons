import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/IToken";
import { ISignIn, IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
    public async signUp(
        dto: Partial<IUser>,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        if (!dto.name || dto.name.length < 3) {
            throw new ApiError(
                "Name is required and sould be at least 3 characters long",
                400,
            );
        }
        if (!dto.email || !dto.email.includes("@")) {
            throw new ApiError("Email is required and should be valid", 400);
        }
        if (!dto.password || dto.password.length < 6) {
            throw new ApiError(
                "Password is required and should be at least 6 charachters",
                400,
            );
        }

        const password = await passwordService.hashPassword(dto.password);
        const user = await userRepository.create({ ...dto, password });
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }

    public async signIn(
        dto: ISignIn,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        const isPasswordCorrect = await passwordService.comparePassword(
            dto.password,
            user.password,
        );
        if (!isPasswordCorrect) {
            throw new ApiError("Invalid credentials", 401);
        }

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }

    // TODO add refresh token service
    public async refreshToken(
        jwtPayload: ITokenPayload,
        oldRefreshToken: string,
    ): Promise<ITokenPair> {
        await tokenRepository.deleteOneByParams({ _userId: jwtPayload.userId });

        const tokens = tokenService.generateTokens({
            userId: jwtPayload.userId,
            role: jwtPayload.role,
        });

        await tokenRepository.create({ ...tokens, _userId: jwtPayload.userId });
        return tokens;
    }
}

export const authService = new AuthService();
