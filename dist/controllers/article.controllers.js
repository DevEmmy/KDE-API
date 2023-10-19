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
const article_service_1 = __importDefault(require("../services/article.service"));
const error_responses_1 = require("../helpers/error-responses");
const uploader_config_1 = require("../config/uploader.config");
class ArticleController {
    constructor() {
        this.articleServices = new article_service_1.default();
    }
    getAllArticles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.articleServices.getArticles({});
                res.status(200).json({ message: "Articles fetched successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getUserArticles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const data = yield this.articleServices.getArticles({ author: userId });
                res
                    .status(200)
                    .json({ message: "User articles fetched successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getMyArticles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const data = yield this.articleServices.getArticles({ author: userId });
                res
                    .status(200)
                    .json({ message: "User's articles fetched successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getSingleArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const data = yield this.articleServices.findById(_id);
                res.status(200).json({ message: "Article fetchehd successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    addArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = req.userId;
                const { title, body, category } = req.body;
                const file = req.file;
                if (!file)
                    throw new error_responses_1.BadRequestError("Provide cover");
                const cover = yield (0, uploader_config_1.uploadToCloud)(file);
                const data = yield this.articleServices.addArticle({
                    title,
                    body,
                    category,
                    author,
                    cover,
                });
                res.status(201).json({ message: "Article created successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    editArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = req.userId;
                const _id = req.params.id;
                const { title, body, category } = req.body;
                const file = req.file;
                let cover;
                if (file) {
                    cover = yield (0, uploader_config_1.uploadToCloud)(file);
                }
                const data = yield this.articleServices.editArticle({
                    author,
                    _id,
                    title,
                    body,
                    category,
                    cover: cover,
                });
                res.status(201).json({ message: "Article edited successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    deleteArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const _id = req.params.id;
                yield this.articleServices.deleteArticle(userId, _id);
                res.status(200).json({ message: "Article deleted successfully" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
const articleController = new ArticleController();
exports.default = articleController;
