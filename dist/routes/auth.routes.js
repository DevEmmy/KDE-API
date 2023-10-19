"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validations_1 = __importDefault(require("../validations"));
const auth_validation_1 = require("../validations/auth.validation");
const auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = (0, express_1.Router)();
router.post("/register", (0, validations_1.default)(auth_validation_1.SignupInput), auth_controllers_1.default.register);
router.post("/verify-account", (0, validations_1.default)(auth_validation_1.VerifyEmailInput), auth_controllers_1.default.verifyAccount);
router.post("/login", (0, validations_1.default)(auth_validation_1.LoginInput), auth_controllers_1.default.login);
router.post("/forgot-password", (0, validations_1.default)(auth_validation_1.RequestPasswordResetInput), auth_controllers_1.default.requestPasswordResetToken);
router.patch("/reset-password", (0, validations_1.default)(auth_validation_1.ResetPasswordInput), auth_controllers_1.default.resetPassword);
router.patch("/change-password", isAuth_1.default, (0, validations_1.default)(auth_validation_1.ChangePasswordInput), auth_controllers_1.default.changePassword);
exports.default = router;
