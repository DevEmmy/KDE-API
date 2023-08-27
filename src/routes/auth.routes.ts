import { Router } from "express";
import validate from "../validations";
import {
  LoginInput,
  SignupInput,
  VerifyEmailInput,
} from "../validations/auth.validation";
import authController from "../controllers/auth.controllers";

const router = Router();

router.post("/register", validate(SignupInput), authController.register);

router.post(
  "/verify-account",
  validate(VerifyEmailInput),
  authController.verifyAccount
);

router.post("/login", validate(LoginInput), authController.login);

export default router;
