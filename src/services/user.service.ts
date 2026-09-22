import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/IToken";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getList(): Promise<IUser[]> {
        return await userRepository.getList();
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", 404);
        }

        return user;
    }

    public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
        const user = await userRepository.getById(jwtPayload.userId);

        if (!user) {
            throw new ApiError("User not found", 404);
        }

        return user;
    }

    public async putMe(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
        return await userRepository.putById(jwtPayload.userId, dto);
    }

    public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
        return await userRepository.deleteById(jwtPayload.userId);
    }
}

export const userService = new UserService();
