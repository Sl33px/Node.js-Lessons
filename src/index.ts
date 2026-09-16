import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
    "*",
    (error: ApiError, request: Request, res: Response, next: NextFunction) => {
        res.status(error.status || 500).send(error.message);
    },
);

app.listen(configs.APP_PORT, async () => {
    await mongoose.connect(configs.MONGO_URL);

    console.log(
        `Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`,
    );
});
