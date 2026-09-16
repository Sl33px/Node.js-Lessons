import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public isIdValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!isObjectIdOrHexString(req.params[key])) {
                    throw new ApiError("Invalid ID", 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public isBodyValid(schema: Joi.Schema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error } = schema.validate(req.body);

                if (error) {
                    throw new ApiError(error.message, 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public isQueryValid(schema: Joi.Schema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = schema.validate(req.query);

                if (error) {
                    throw new ApiError(error.message, 400);
                }
                req.query = value;
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public isParamsValid(schema: Joi.Schema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = schema.validate(req.params);

                if (error) {
                    throw new ApiError(error.message, 400);
                }
                req.params = value;
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
