"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const category_validation_1 = require("../validations/category.validation");
const category_controllers_1 = __importDefault(require("../controllers/category.controllers"));
const validations_1 = __importDefault(require("../validations"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const router = (0, express_1.Router)();
router
    .route("/")
    .post(isAuth_1.default, isAdmin_1.default, (0, validations_1.default)(category_validation_1.CreateCategoryInput), category_controllers_1.default.addCategory)
    .get(isAuth_1.default, category_controllers_1.default.getAllCategories);
router
    .route("/:id")
    .put(isAuth_1.default, isAdmin_1.default, (0, validations_1.default)(category_validation_1.EditCategoryInput), category_controllers_1.default.editCategory)
    .delete(isAuth_1.default, isAdmin_1.default, (0, validations_1.default)(category_validation_1.DeleteCategoryInput), category_controllers_1.default.deleteCategory);
exports.default = router;
