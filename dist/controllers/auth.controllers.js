"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, password, email, confirmPassword, phoneNumber1, isAdmin, } = req.body;
                yield this.authServices.createAccount({
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    phoneNumber1,
                    isAdmin: isAdmin ? true : false,
                });
                res.status(201).json({ message: "Verification email sent" });
            }
            catch (error) {
                return next(error);
            }
        });
        this.verifyAccount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            try {
                yield this.authServices.verifyAccount(token);
                res.status(200).json({ message: "Account verified successfully" });
            }
            catch (error) {
                return next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const response = yield this.authServices.loginUser({ email, password });
                res.status(200).json({
                    message: "Login successful",
                    data: { accessToken: response.accessToken, user: response.user },
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.requestPasswordResetToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.authServices.sendPasswordResetToken(email);
                res.status(200).json({
                    message: "Password reset link has been sent to your email",
                    data: null,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, confirmPassword, code } = req.body;
                yield this.authServices.resetPassword({ password, confirmPassword }, code);
                res
                    .status(200)
                    .json({ message: "Password reset successful", data: null });
            }
            catch (error) {
                return next(error);
            }
        });
        this.changePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, confirmPassword, oldPassword } = req.body;
                const userId = req.userId;
                yield this.authServices.changePassword({
                    password,
                    confirmPassword,
                    oldPassword,
                    _id: userId,
                });
                res
                    .status(200)
                    .json({ message: "Password changed successfully", data: null });
            }
            catch (error) {
                return next(error);
            }
        });
        this.authServices = new auth_service_1.AuthService();
    }
}
const authController = new AuthController();
exports.default = authController;
