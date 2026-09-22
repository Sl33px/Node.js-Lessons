import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import {
    updateUserValidator,
    userQueryValidator,
} from "../validators/user.validator";

const router = Router();

router.get(
    "/",
    commonMiddleware.isQueryValid(userQueryValidator),
    userController.getList,
);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.put(
    "/me",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(updateUserValidator),
    userController.putMe,
);

router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.get(
    "/:userId",
    commonMiddleware.isIdValid("userId"),
    userController.getById,
);

export const userRouter = router;
