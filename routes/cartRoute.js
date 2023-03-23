const router = require("express").Router()
const { getAllCart, createCart, addToCart, deleteFromCart } = require("../controllers/cartController")
const requireLogin = require("../middlewares/requireLogin")

router.get("/all", requireLogin, getAllCart)
router.get("/", requireLogin, createCart)
router.patch('/add/:cartId', requireLogin, addToCart)
router.patch("/remove/:cartId", requireLogin, deleteFromCart)

module.exports = router