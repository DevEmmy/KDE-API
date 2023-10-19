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
const error_responses_1 = require("../helpers/error-responses");
const Jwt_helper_1 = __importDefault(require("../helpers/Jwt.helper"));
const user_service_1 = require("../services/user.service");
const logger_config_1 = __importDefault(require("../config/logger.config"));
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = req.headers["authorization"];
        if (!headers || !headers.startsWith("Bearer ")) {
            return next(new error_responses_1.UnauthorizedError("Provide token header as Bearer ${token}"));
        }
        const token = headers.split(" ")[1];
        if (!token) {
            logger_config_1.default.info("User tried to access routes without token");
            return next(new error_responses_1.UnauthorizedError("Provide token"));
        }
        const userAuth = yield Jwt_helper_1.default.verifyAccessToken(token);
        if (!userAuth) {
            logger_config_1.default.info("User tried to access routes with invalid token");
            return next(new error_responses_1.UnauthorizedError("Token is invalid or has expired"));
        }
        const userService = new user_service_1.UserService();
        const user = yield userService.getUserByAuthId(userAuth.id);
        req.userId = user._id;
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.default = isAuth;
