import { Router } from "express";
import articleController from "../controllers/article.controllers";
import isAuth from "../middlewares/isAuth";
import validate from "../validations";
import {
  AddArticleValidation,
  EditArticleValidation,
} from "../validations/article.validation";
import { fileUploader } from "../config/uploader.config";

const router = Router();

router
  .route("/")
  .post(
    isAuth,
    validate(AddArticleValidation),
    fileUploader.single("media"),
    articleController.addArticle
  )
  .get(articleController.getAllArticles);

router
  .route("/:id")
  .put(
    isAuth,
    validate(EditArticleValidation),
    fileUploader.single("media"),
    articleController.editArticle
  )
  .delete(isAuth, articleController.deleteArticle)
  .get(articleController.getSingleArticle);

router.route("/user").get(isAuth, articleController.getMyArticles);

router.route("/user/:id").get(articleController.getUserArticles);

export default router;
