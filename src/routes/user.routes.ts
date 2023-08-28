import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/", isAuth, userController.getUserProfile);

export default router;
