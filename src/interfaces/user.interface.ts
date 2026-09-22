import { RoleEnum } from "../enums/role.enum";

export interface IUser {
    _id?: string;
    name: string;
    age: number;
    email: string;
    password: string;
    phone?: string;
    role: RoleEnum;
    isVerified: boolean;
    isDeleted: boolean;
    createAt?: Date;
    updateAt?: Date;
}

export type ISignIn = Pick<IUser, "email" | "password">;

export type IResetPasswordSend = Pick<IUser, "email">;
export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };
