import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import userController from "../controllers/user.controller";
import validate from "../validations";
import {
  EditUserInput,
  GetUserProfileInput,
} from "../validations/user.validation";

const router = Router();

router
  .route("/")
  .get(isAuth, userController.getUserProfile)
  .put(isAuth, validate(EditUserInput), userController.editUserProfile)
  .delete(isAuth, userController.deleteAccount);

router.patch("/become-a-seller", isAuth, userController.becomeASeller);
router.get(
  "/profile/:id",
  validate(GetUserProfileInput),
  userController.viewUserProfile
);

export default router;
