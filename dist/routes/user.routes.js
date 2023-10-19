"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validations_1 = __importDefault(require("../validations"));
const user_validation_1 = require("../validations/user.validation");
const uploader_config_1 = require("../config/uploader.config");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(isAuth_1.default, user_controller_1.default.getUserProfile)
    .put(isAuth_1.default, (0, validations_1.default)(user_validation_1.EditUserInput), user_controller_1.default.editUserProfile)
    .delete(isAuth_1.default, user_controller_1.default.deleteAccount);
router.patch("/become-a-seller", isAuth_1.default, user_controller_1.default.becomeASeller);
router.get("/profile/:id", (0, validations_1.default)(user_validation_1.GetUserProfileInput), user_controller_1.default.viewUserProfile);
router.patch("/profile-picture", isAuth_1.default, uploader_config_1.fileUploader.single("dp"), user_controller_1.default.updateProfilePicture);
exports.default = router;
