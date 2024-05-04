import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import userController from "../controllers/user.controller";
import validate from "../validations";
import {
  EditUserInput,
  GetUserProfileInput,
} from "../validations/user.validation";
import { fileUploader } from "../config/uploader.config";

const router = Router();

router
  .route("/")
  .get(isAuth, userController.getUserProfile)
  .put(isAuth, validate(EditUserInput), userController.editUserProfile)
  .delete(isAuth, userController.deleteAccount);
router.get(
  "/profile/:id",
  validate(GetUserProfileInput),
  userController.viewUserProfile
);
router.patch(
  "/profile-picture",
  isAuth,
  fileUploader.single("dp"),
  userController.updateProfilePicture
);

export default router;
