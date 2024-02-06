import { Router } from "express";
import validate from "../validations";
import {
  SubscribeToNewsletterInput,
  UnSubscribeFromNewsletterInput,
} from "../validations/newsletter.validation";
import newsletterController from "../controllers/newsletter.controller";

const router = Router();

router.post(
  "/subscription",
  validate(SubscribeToNewsletterInput),
  newsletterController.subscribeToNewsLetter
);

router.delete(
  "/subscription/:email",
  validate(UnSubscribeFromNewsletterInput),
  newsletterController.unsubscribeFromNewsletter
);

export default router;
