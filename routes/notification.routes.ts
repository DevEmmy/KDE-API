import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import notificationControllers from "../controllers/notifications.controller";

const router = Router();

router.get("/", isAuth, notificationControllers.getUserNotifications);
router.post("/", isAuth, notificationControllers.sendNotification);
router.get("/read/:id", isAuth, notificationControllers.readNotifications);
router.get("/unread", isAuth, notificationControllers.getUnreadNotifications);

export default router;
