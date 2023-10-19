"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controllers_1 = __importDefault(require("../controllers/article.controllers"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const validations_1 = __importDefault(require("../validations"));
const article_validation_1 = require("../validations/article.validation");
const uploader_config_1 = require("../config/uploader.config");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(isAuth_1.default, (0, validations_1.default)(article_validation_1.AddArticleValidation), uploader_config_1.fileUploader.single("media"), article_controllers_1.default.addArticle)
    .get(article_controllers_1.default.getAllArticles);
router
    .route("/:id")
    .put(isAuth_1.default, (0, validations_1.default)(article_validation_1.EditArticleValidation), uploader_config_1.fileUploader.single("media"), article_controllers_1.default.editArticle)
    .delete(isAuth_1.default, article_controllers_1.default.deleteArticle)
    .get(article_controllers_1.default.getSingleArticle);
router.route("/user").get(isAuth_1.default, article_controllers_1.default.getMyArticles);
router.route("/user/:id").get(article_controllers_1.default.getUserArticles);
exports.default = router;
