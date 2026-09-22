import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.validator";

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

// TODO add refresh token route
router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refreshToken,
);

export const authRouter = router;
