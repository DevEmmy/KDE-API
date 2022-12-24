const { getUsersNotification, readNotification, sendNotification, getUnreadNotification } = require("../controllers/notificationsControllers");
const requireLogin = require("../middlewares/requireLogin");
const router = require("express").Router();

router.get("/all", requireLogin, getUsersNotification)
router.get("/read/:id", requireLogin, readNotification)
router.post("/", requireLogin, sendNotification)
router.get("/unread", requireLogin, getUnreadNotification)

module.exports = router;