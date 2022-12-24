const router = require("express").Router();
const { getAllListing, uploadAList, deleteList, updateList, makeUnavailable, getUserListing, getAList, viewAList } = require("../controllers/listingsControllers");
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
router.get("/view/:id", requireLogin, viewAList)

module.exports = router;