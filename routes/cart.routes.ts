import { Router } from "express";
import cartControllers from "../controllers/cart.controller";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.get("/all", isAuth, cartControllers.getAllCart);
router.post("/", isAuth, cartControllers.createCart);
router.patch("/add", isAuth, cartControllers.addToCart);
router.patch("/remove", isAuth, cartControllers.deleteFromCart);
router.patch("/clear", isAuth, cartControllers.clearCart);
router.patch("/delete-multiple", isAuth, cartControllers.deleteMultiple);

export default router;
