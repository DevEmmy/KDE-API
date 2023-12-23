import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import chatController from "../controllers/chat.controller";
import validate from "../validations";
import { SendMessageInput } from "../validations/chat.validation";

const router = Router();

router.post(
  "/conversation/user/:id",
  isAuth,
  chatController.createConversation
);
router.get("/conversation", isAuth, chatController.getUserConversations);
router.get("/conversation/:id", isAuth, chatController.getSingleConversation);
router.post(
  "/message",
  isAuth,
  validate(SendMessageInput),
  chatController.sendMessage
);
router.get("/message/conversation/:id", isAuth, chatController.getMessages);

export default router;
