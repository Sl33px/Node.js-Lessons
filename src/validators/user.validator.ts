import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { RoleEnum } from "../enums/role.enum";

export const userValidator = Joi.object({
    name: Joi.string().required().min(3).max(20),
    age: Joi.number().required().min(0).max(100),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(20),
    phone: Joi.string(),
    role: Joi.string()
        .valid(...Object.values(RoleEnum))
        .optional(),
});

export const updateUserValidator = Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    age: Joi.number().min(0).max(100).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).max(20).optional(),
    phone: Joi.string().optional(),
    role: Joi.string()
        .valid(...Object.values(RoleEnum))
        .optional(),
});

export const userQueryValidator = Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).max(100).optional(),
    search: Joi.string().optional(),
});

export const userIdParamValidator = Joi.object({
    userId: Joi.string()
        .custom((value, helpers) => {
            if (!isObjectIdOrHexString(value)) {
                return helpers.error("any.invalid");
            }
            return value;
        })
        .required()
        .messages({ "any.invalid": "Invalid userId format" }),
});

export const changePasswordValidator = Joi.object({
    oldPassword: Joi.string().required(),
    password: Joi.string().required(),
});
