import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import {
    changePasswordValidator,
    userValidator,
} from "../validators/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.isBodyValid(userValidator),
    authController.signUp,
);

router.post(
    "/sign-in",
    // commonMiddleware.isBodyValid(userValidator),
    authController.signIn,
);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refreshToken,
);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

router.post(
    "/logout-all",
    authMiddleware.checkAccessToken,
    authController.logoutAll,
);

router.post("/forgot-password", authController.forgotPasswordSendGmail);
router.put(
    "/forgot-password",
    authMiddleware.checkActionToken,
    authController.forgotPasswordSet,
);

router.post(
    "/change-password",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(changePasswordValidator),
    authController.changePassword,
);

router.post(
    "/verify",
    authMiddleware.checkVerifyEmailToken,
    authController.verifyUser,
);

export const authRouter = router;
