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
const user_service_1 = require("../services/user.service");
const error_responses_1 = require("../helpers/error-responses");
class UserController {
    constructor() {
        this.getUserProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const data = yield this.userService.getUserById(userId);
                res
                    .status(200)
                    .json({ message: "User profile fetched successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.editUserProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const userId = req.userId;
                const data = yield this.userService.editProfile(body, userId);
                res
                    .status(200)
                    .json({ message: "User profile updated successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.deleteAccount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                yield this.userService.deleteAccount(userId);
                res
                    .status(200)
                    .json({ message: "User account deleted successfully", data: null });
            }
            catch (error) {
                return next(error);
            }
        });
        this.becomeASeller = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                yield this.userService.becomeASeller(userId);
                res.status(200).json({ message: "You are now a seller", data: null });
            }
            catch (error) {
                return next(error);
            }
        });
        this.viewUserProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const profileId = req.params.id;
            try {
                const data = yield this.userService.viewUserProfile(profileId);
                res
                    .status(200)
                    .json({ message: "User profile fetched successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.updateProfilePicture = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                const userId = req.userId;
                if (!file) {
                    throw new error_responses_1.BadRequestError("Provide file");
                }
                const image = yield this.userService.updateProfilePicture(file, userId);
                res.status(200).json({ message: "Profile picture updated", data: image });
            }
            catch (error) {
                return next(error);
            }
        });
        this.userService = new user_service_1.UserService();
    }
}
const userController = new UserController();
exports.default = userController;
