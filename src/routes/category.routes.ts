import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  EditCategoryInput,
} from "../validations/category.validation";
import categoryController from "../controllers/category.controllers";
import validate from "../validations";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router
  .route("/")
  .post(
    isAuth,
    isAdmin,
    validate(CreateCategoryInput),
    categoryController.addCategory
  )
  .get(isAuth, categoryController.getAllCategories);

router
  .route("/:id")
  .put(
    isAuth,
    isAdmin,
    validate(EditCategoryInput),
    categoryController.editCategory
  )
  .delete(
    isAuth,
    isAdmin,
    validate(DeleteCategoryInput),
    categoryController.deleteCategory
  );

export default router;
