const { getMessages, sendMessage } = require("../controllers/messagesController");
const requireLogin = require("../middlewares/requireLogin");

const router = require("express").Router();

router.get("/:conversationId", requireLogin, getMessages )
router.post("/send-message", requireLogin, sendMessage)

module.exports = router