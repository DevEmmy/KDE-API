const router = require("express").Router();
const User = require("../models/users.model");
const jwt_token = require("jsonwebtoken");
require("dotenv").config()
const jwt_secret = process.env.JWT_SECRET;
const requireLogin = require("../middlewares/requireLogin");
const { getAllUsers, signIn, signUp, updateUserTypeToSeller, deleteAccount, updateProfile, addToSaved } = require("../controllers/usersControllers");

router.get("/all-users", requireLogin, getAllUsers)
router.post("/sign-in", signIn)
router.post("/sign-up", signUp)
router.patch("/update-user-to-seller", requireLogin,updateUserTypeToSeller)
router.delete("/delete-account", requireLogin, deleteAccount)
router.patch("/update", requireLogin, updateProfile)
router.put("/add-to-saved", requireLogin, addToSaved)

module.exports = router