const router = require("express").Router();
const { getAllListing, uploadAList, deleteList, updateList, makeUnavailable, getUserListing, getAList, viewAList, searchListing } = require("../controllers/listingsControllers");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/users.model");
require("dotenv").config()

router.get("/all", getAllListing)
router.get("/each/:id", getAList)
router.post("/upload-list", requireLogin, uploadAList)
router.delete("/delete/:id", requireLogin, deleteList)
router.patch("update/:id", requireLogin, updateList)
router.patch("/make-unavailable/:id", requireLogin, makeUnavailable)
router.get('/user-listing',requireLogin, getUserListing)
router.patch("/view/:id", requireLogin, viewAList)
router.patch("/save/:id", requireLogin, viewAList)
router.get("/search", searchListing)

module.exports = router;