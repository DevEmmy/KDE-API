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
const category_service_1 = __importDefault(require("../services/category.service"));
class CategoryController {
    constructor() {
        this.addCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.body;
                const data = yield this.categoryService.addCategory({ title });
                res.status(201).json({ message: "Category created successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.editCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.body;
                const { id } = req.params;
                const data = yield this.categoryService.editCategory({ _id: id, title });
                res.status(200).json({ message: "Category edited successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.deleteCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.categoryService.deleteCategory(id);
                res
                    .status(200)
                    .json({ message: "Category deleted successfully", data: null });
            }
            catch (error) {
                return next(error);
            }
        });
        this.getAllCategories = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.getAllCategories();
                res
                    .status(200)
                    .json({ message: "Categories fetched successfully", data: categories });
            }
            catch (error) {
                return next(error);
            }
        });
        this.categoryService = new category_service_1.default();
    }
}
const categoryController = new CategoryController();
exports.default = categoryController;
