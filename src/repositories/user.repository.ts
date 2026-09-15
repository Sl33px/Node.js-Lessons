import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
    public async getList(): Promise<IUser[]> {
        return await read();
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        const users = await read();

        const newUser = {
            id: users.length ? users[users.length - 1]?.id + 1 : 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };
        users.push(newUser);

        await write(users);
        return newUser;
    }

    public async getById(userId: number): Promise<IUser | null> {
        const users = await read();
        return users.find((user) => user.id === userId);
    }

    public async putById(userId: number, dto: Partial<IUser>): Promise<IUser> {
        const users = await read();
        const userIndex = users.findIndex((user) => user.id === userId);

        // Обновляем данные конкретного пользователя
        users[userIndex] = {
            ...users[userIndex],
            ...(dto.name && { name: dto.name }),
            ...(dto.email && { email: dto.email }),
            ...(dto.password && { password: dto.password }),
        };

        await write(users);
        return users[userIndex];
    }

    public async deleteById(userId: number): Promise<void> {
        const users = await read();
        const userIndex = users.findIndex((user) => user.id === userId);

        users.splice(userIndex, 1);
        await write(users);
    }
}

export const userRepository = new UserRepository();
