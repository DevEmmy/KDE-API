const router = require("express").Router();
const User = require("../models/users.model");
const jwt_token = require("jsonwebtoken");
require("dotenv").config()
const jwt_secret = process.env.JWT_SECRET;
const requireLogin = require("../middlewares/requireLogin");
const { getAllUsers, signIn, signUp } = require("../controllers/usersControllers");

router.get("/all-users", requireLogin, getAllUsers)
router.post("/sign-in", signIn)
router.post("/sign-up", signUp)

module.exports = router