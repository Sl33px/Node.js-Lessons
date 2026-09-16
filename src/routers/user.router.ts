import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import {
    updateUserValidator,
    userIdParamValidator,
    userQueryValidator,
    userValidator,
} from "../validators/user.validator";

const router = Router();

router.get(
    "/",
    commonMiddleware.isQueryValid(userQueryValidator),
    userController.getList,
);

router.post(
    "/",
    commonMiddleware.isBodyValid(userValidator),
    userController.create,
);

router.get(
    "/:userId",
    commonMiddleware.isIdValid("userId"),
    userController.getById,
);

router.put(
    "/:userId",
    commonMiddleware.isParamsValid(userIdParamValidator),
    commonMiddleware.isBodyValid(updateUserValidator),
    userController.putById,
);

router.delete(
    "/:userId",
    commonMiddleware.isParamsValid(userIdParamValidator),
    userController.deleteById,
);

export const userRouter = router;
