const router = require("express").Router();
const { getUserConversations, createNewConversation, getConversationById } = require("../controllers/conversationController");
const requireLogin = require("../middlewares/requireLogin");

router.get("/user-conversations", requireLogin, getUserConversations)
router.post("/new-conversation/:id", requireLogin, createNewConversation)
router.get("/:id", requireLogin, getConversationById)

module.exports = router