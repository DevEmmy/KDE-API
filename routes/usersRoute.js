const router = require("express").Router();
const User = require("../models/users.model");
const jwt_token = require("jsonwebtoken");
require("dotenv").config()
const jwt_secret = process.env.JWT_SECRET;
const requireLogin = require("../middlewares/requireLogin");
const { getAllUsers, signIn, signUp, updateUserTypeToSeller, deleteAccount, updateProfile, addToSaved, getSignedInUser, getUserById, verifyUser, updateBankDetails, viewProfile, forgottenPassword, reset_password, changeAccountType, selectSellerType, getAdminDetails } = require("../controllers/usersControllers");

router.get("/all-users", getAllUsers) // added
router.get("/me", requireLogin, getSignedInUser) //added
router.get("/:id", getUserById) // added
router.post("/sign-in", signIn) //added
router.post("/sign-up", signUp) //added
router.delete("/delete-account", requireLogin, deleteAccount) //added
router.patch("/update", requireLogin, updateProfile) //added
router.patch("/verify", requireLogin, verifyUser) //added
router.patch("update/bank-details", requireLogin, updateBankDetails)

router.patch("/view/:id", requireLogin, viewProfile) //added
router.post("/forgotten-password", forgottenPassword)//added
router.post("/reset-password", reset_password) //added
router.patch("/change-account-type",requireLogin, changeAccountType)
router.patch("/select-seller-type", requireLogin, selectSellerType)
router.get("/admin/details", getAdminDetails)

module.exports = router