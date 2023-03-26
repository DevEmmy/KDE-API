const router = require("express").Router()
const { getAllCart, createCart, addToCart, deleteFromCart, clearCart, deleteMultiple } = require("../controllers/cartController")
const requireLogin = require("../middlewares/requireLogin")

router.get("/all", requireLogin, getAllCart)
router.get("/", requireLogin, createCart)
router.patch('/add/', requireLogin, addToCart)
router.patch("/remove/", requireLogin, deleteFromCart)
router.patch("/clear", requireLogin, clearCart)
router.patch("/delete-multiple", requireLogin, deleteMultiple)

module.exports = router