import express, { NextFunction, Request, Response } from "express";

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

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
