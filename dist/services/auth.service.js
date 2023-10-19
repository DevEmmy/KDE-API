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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mailer_config_1 = __importDefault(require("../config/mailer.config"));
const mails_1 = require("../constants/mails");
const error_responses_1 = require("../helpers/error-responses");
const user_interface_1 = require("../interfaces/model/user.interface");
const user_auth_model_1 = __importDefault(require("../models/user.auth.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_token_model_1 = __importDefault(require("../models/user.token.model"));
const Jwt_helper_1 = __importDefault(require("../helpers/Jwt.helper"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    createToken(email, type, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = { email, type };
            if (code) {
                body.token = code;
            }
            const token = yield user_token_model_1.default.create(body);
            return token;
        });
    }
    generateCryptoToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = crypto_1.default.randomBytes(32).toString("hex");
            return token;
        });
    }
    getUserAuth(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_auth_model_1.default.findOne(param);
            if (!user) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            return user;
        });
    }
    createAccount(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password, confirmPassword, phoneNumber1, } = body;
                /**
                 * Create Account, token and send email
                 */
                if (password != confirmPassword) {
                    throw new error_responses_1.BadRequestError("Passwords do not match");
                }
                yield user_auth_model_1.default.create({ password, email });
                const user = yield user_model_1.default.create({
                    firstName,
                    lastName,
                    email,
                    phoneNumber1,
                });
                const token = yield this.createToken(email, user_interface_1.ITokenTypes.accountVerificationToken);
                yield (0, mailer_config_1.default)({
                    to: email,
                    subject: "Verify your account",
                    html: (0, mails_1.verifyEmailHTML)(user, token.token),
                });
            }
            catch (error) {
                if (error.code === 11000) {
                    throw new error_responses_1.BadRequestError("A user with this email already exists");
                }
                throw new error_responses_1.BadRequestError(error.message);
            }
        });
    }
    verifyAccount(token) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Check if the token exist.
             * Check if the account is already verified
             * Verify if not
             */
            const tokenInDb = yield user_token_model_1.default.findOne({
                token,
                type: user_interface_1.ITokenTypes.accountVerificationToken,
            });
            if (!tokenInDb) {
                throw new error_responses_1.NotFoundError("Token does not exist or has expired");
            }
            const email = tokenInDb.email;
            yield user_token_model_1.default.findOneAndDelete({
                token,
                type: user_interface_1.ITokenTypes.accountVerificationToken,
            });
            const userAuth = yield user_auth_model_1.default.findOne({ email });
            if (!userAuth) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            if (userAuth === null || userAuth === void 0 ? void 0 : userAuth.verified) {
                throw new error_responses_1.BadRequestError("Account is already verified, kinldy proceed to login");
            }
            userAuth.verified = true;
            yield userAuth.save();
        });
    }
    loginUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            const userAuth = yield user_auth_model_1.default.findOne({ email });
            if (!userAuth) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            const isPasswordCorrect = yield userAuth.verifyPassword(password);
            if (!isPasswordCorrect) {
                throw new error_responses_1.BadRequestError("password is incorrect");
            }
            const user = yield user_model_1.default.findOne({ email });
            if (!userAuth.verified) {
                // delete the previous token if it exists then create a new one
                yield user_token_model_1.default.findOneAndDelete({
                    email,
                    type: user_interface_1.ITokenTypes.accountVerificationToken,
                });
                const token = yield this.createToken(email, user_interface_1.ITokenTypes.accountVerificationToken);
                yield (0, mailer_config_1.default)({
                    to: email,
                    subject: "Verify account",
                    html: (0, mails_1.verifyEmailHTML)(user, token.token),
                });
                throw new error_responses_1.BadRequestError("Your account is not verified, a new verification link has been sent to your email");
            }
            else {
                const accessToken = yield Jwt_helper_1.default.signAccessToken(userAuth._id);
                return { accessToken, user: user };
            }
        });
    }
    sendPasswordResetToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            const hex = yield this.generateCryptoToken();
            const token = yield this.createToken(email, user_interface_1.ITokenTypes.passwordResetToken, hex);
            yield (0, mailer_config_1.default)({
                to: email,
                subject: "Password reset link",
                html: (0, mails_1.resetPasswordHTML)(user, token.token),
            });
        });
    }
    resetPassword(body, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, confirmPassword } = body;
            if (password != confirmPassword) {
                throw new error_responses_1.BadRequestError("Passwords do not match");
            }
            const tokenInDb = yield user_token_model_1.default.findOne({
                token,
                type: user_interface_1.ITokenTypes.passwordResetToken,
            });
            if (!tokenInDb) {
                throw new error_responses_1.NotFoundError("Token does not exist or has expired");
            }
            yield user_auth_model_1.default.findOneAndUpdate({ email: tokenInDb.email }, {
                password: yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(10)),
            });
            yield tokenInDb.deleteOne();
        });
    }
    changePassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, confirmPassword, _id, oldPassword } = body;
            if (password !== confirmPassword) {
                throw new error_responses_1.BadRequestError("Password and confirm password do not match");
            }
            const user = yield user_model_1.default.findById(_id);
            if (!user) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            // check if the old password is correct
            const userAuth = yield user_auth_model_1.default.findOne({ email: user.email });
            if (!userAuth) {
                throw new error_responses_1.NotFoundError("User Auth does not exist");
            }
            const isOldPasswordCorrect = yield (userAuth === null || userAuth === void 0 ? void 0 : userAuth.verifyPassword(oldPassword));
            if (!isOldPasswordCorrect) {
                throw new error_responses_1.ForbiddenError("Old password is incorrect");
            }
            const newPasswordHash = yield bcryptjs_1.default.hash(password, yield bcryptjs_1.default.genSalt(10));
            userAuth.password = newPasswordHash;
            yield (userAuth === null || userAuth === void 0 ? void 0 : userAuth.save());
        });
    }
}
exports.AuthService = AuthService;
