const { getAll, addCategory, deleteCategory, editCategory, getById } = require("../controllers/categoryController")
const requireLogin = require("../middlewares/requireLogin")

const router = require("express").Router()

router.get("/all", getAll)
router.post("/new", requireLogin, addCategory)
router.delete("/:id", requireLogin, deleteCategory)
router.patch("/:id", requireLogin, editCategory)
router.get("/:id", getById)

module.exports = router