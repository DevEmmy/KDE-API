import { Router } from "express";
import validate from "../validations";
import {
  ChangePasswordInput,
  LoginInput,
  RequestPasswordResetInput,
  ResetPasswordInput,
  SignupInput,
  VerifyEmailInput,
} from "../validations/auth.validation";
import authController from "../controllers/auth.controllers";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/register", validate(SignupInput), authController.register);

router.post(
  "/verify-account",
  validate(VerifyEmailInput),
  authController.verifyAccount
);

router.post("/login", validate(LoginInput), authController.login);

router.post(
  "/forgot-password",
  validate(RequestPasswordResetInput),
  authController.requestPasswordResetToken
);
router.patch(
  "/reset-password",
  validate(ResetPasswordInput),
  authController.resetPassword
);
router.patch(
  "/change-password",
  isAuth,
  validate(ChangePasswordInput),
  authController.changePassword
);

export default router;
