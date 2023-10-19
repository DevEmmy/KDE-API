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
const slugify_1 = __importDefault(require("../helpers/slugify"));
const article_model_1 = __importDefault(require("../models/article.model"));
const category_service_1 = __importDefault(require("./category.service"));
class ArticleServices {
    constructor() {
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const article = yield article_model_1.default.findById(id);
            if (!article)
                throw new error_responses_1.NotFoundError("article does not exist");
            return article;
        });
        this.getArticles = (query) => __awaiter(this, void 0, void 0, function* () {
            const articles = yield article_model_1.default.find(query);
            return articles;
        });
        this.deleteArticle = (userId, articleId) => __awaiter(this, void 0, void 0, function* () {
            const article = yield article_model_1.default.findById(articleId);
            if (!article)
                throw new error_responses_1.NotFoundError("Article does not exist");
            if (article.author.toString() != userId.toString())
                throw new error_responses_1.ForbiddenError("This article does not belong to you");
            yield article.deleteOne();
        });
        this.addArticle = (query) => __awaiter(this, void 0, void 0, function* () {
            let { title, cover, body, author, category } = query;
            category = yield this.categoryService.getCategoryById(category);
            const slug = (0, slugify_1.default)(title);
            return yield article_model_1.default.create({
                author,
                title,
                cover,
                slug,
                category: category === null || category === void 0 ? void 0 : category._id,
                body,
            });
        });
        this.editArticle = (query) => __awaiter(this, void 0, void 0, function* () {
            let { _id, title, slug, cover, body, author, category } = query;
            category = yield this.categoryService.getCategoryById(category);
            const article = yield article_model_1.default.findById(_id);
            if (!article)
                throw new error_responses_1.NotFoundError("Article does not exist");
            if (article.author.toString() != (author === null || author === void 0 ? void 0 : author.toString()))
                article.title = title || article.title;
            article.slug = (0, slugify_1.default)(title || article.title);
            article.cover = cover || article.cover;
            article.body = body || article.body;
            return yield article.save();
        });
        this.categoryService = new category_service_1.default();
    }
}
exports.default = ArticleServices;
