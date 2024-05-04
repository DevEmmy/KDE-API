import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import validate from "../validations";
import subscriptionController from "../controllers/subscription.controller";
import { subscribeInput } from "../validations/subscription.validation";

const router = Router();

router.post(
  "/",
  isAuth,
  validate(subscribeInput),
  subscriptionController.subscribe
);

export default router;
