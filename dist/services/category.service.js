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
const category_model_1 = __importDefault(require("../models/category.model"));
class CategoryService {
    constructor() { }
    addCategory(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = body;
            const slug = (0, slugify_1.default)(title);
            const category = yield category_model_1.default.create({ slug, title });
            return category;
        });
    }
    editCategory(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, title } = body;
            const slug = (0, slugify_1.default)(title);
            const category = yield category_model_1.default.findByIdAndUpdate(_id, { title, slug }, { new: true });
            if (!category)
                throw new error_responses_1.NotFoundError("Category does not exist");
            return category;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.findByIdAndDelete(id);
            if (!category)
                throw new error_responses_1.NotFoundError("Category does not exist");
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.default.findById(id);
            if (!category)
                throw new error_responses_1.NotFoundError("Category does not exist");
            return category;
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield category_model_1.default.find({});
            return categories;
        });
    }
}
exports.default = CategoryService;
