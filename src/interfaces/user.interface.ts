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

export interface ISignIn extends Pick<IUser, "email" | "password"> {

}