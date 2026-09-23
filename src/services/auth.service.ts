import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/IToken";
import {
    IResetPasswordSend,
    IResetPasswordSet,
    ISignIn,
    IUser,
} from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
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

        const actionToken = tokenService.generateActionTokens(
            { userId: user._id, role: user.role },
            ActionTokenTypeEnum.VERIFY_EMAIL,
        );

        await actionTokenRepository.create({
            type: ActionTokenTypeEnum.VERIFY_EMAIL,
            _userId: user._id,
            token: actionToken,
        });

        await emailService.sendMail(user.email, EmailTypeEnum.WELCOME, {
            name: user.name,
            actionToken,
        });

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

    public async refreshToken(
        jwtPayload: ITokenPayload,
        refreshToken: string,
    ): Promise<ITokenPair> {
        await tokenRepository.deleteOneByParams({ _userId: jwtPayload.userId });

        const tokens = tokenService.generateTokens({
            userId: jwtPayload.userId,
            role: jwtPayload.role,
        });

        await tokenRepository.create({ ...tokens, _userId: jwtPayload.userId });
        return tokens;
    }

    public async logout(
        jwtPayload: ITokenPayload,
        accessToken: string,
    ): Promise<void> {
        await tokenRepository.deleteOneByParams({
            _userId: jwtPayload.userId,
            accessToken,
        });
    }

    public async logoutAll(jwtPayload: ITokenPayload): Promise<void> {
        const user = await userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        await tokenRepository.deleteManyByParams({
            _userId: jwtPayload.userId,
        });

        await emailService.sendMail(user.email, EmailTypeEnum.OLD_VISIT, {
            name: user.name,
        });
    }

    public async forgotPasswordSendEmail(
        dto: IResetPasswordSend,
    ): Promise<void> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        const token = tokenService.generateActionTokens(
            { userId: user._id, role: user.role },
            ActionTokenTypeEnum.FORGOT_PASSWORD,
        );
        await actionTokenRepository.create({
            type: ActionTokenTypeEnum.FORGOT_PASSWORD,
            _userId: user._id,
            token,
        });

        await emailService.sendMail(
            "shaposhnikovdima5580@gmail.com",
            EmailTypeEnum.FORGOT_PASSWORD,
            {
                name: user.name,
                email: user.email,
                actionToken: token,
            },
        );
    }

    public async forgotPasswordSet(
        dto: IResetPasswordSet,
        jwtPayload: ITokenPayload,
    ): Promise<void> {
        const password = await passwordService.hashPassword(dto.password);
        await userRepository.putById(jwtPayload.userId, { password });

        await actionTokenRepository.deleteManyByParams({
            _userId: jwtPayload.userId,
            type: ActionTokenTypeEnum.FORGOT_PASSWORD,
        });

        await tokenRepository.deleteManyByParams({
            _userId: jwtPayload.userId,
        });
    }

    public async verifyUser(jwtPayload: ITokenPayload): Promise<void> {
        await userRepository.putById(jwtPayload.userId, { isVerified: true });
        await actionTokenRepository.deleteManyByParams({
            _userId: jwtPayload.userId,
            type: ActionTokenTypeEnum.VERIFY_EMAIL,
        });
    }
}

export const authService = new AuthService();
