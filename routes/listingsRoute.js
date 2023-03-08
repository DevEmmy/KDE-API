const router = require("express").Router();
const { getAllListing, uploadAList, deleteList, updateList, makeUnavailable, getUserListing, getAList, viewAList, searchListing, saveList } = require("../controllers/listingsControllers");
const requireLogin = require("../middlewares/requireLogin");
const User = require("../models/users.model");
require("dotenv").config()

router.get("/all", getAllListing)//added
router.get("/each/:id", getAList)//added
router.post("/upload-list", requireLogin, uploadAList)//added
router.delete("/delete/:id", requireLogin, deleteList)//added
router.patch("update/:id", requireLogin, updateList)//added
router.patch("/make-unavailable/:id", requireLogin, makeUnavailable)//added
router.get('/user-listing',requireLogin, getUserListing) //added
router.patch("/view/:id", requireLogin, viewAList) // added
router.patch("/save/:id", requireLogin, saveList) // added
router.get("/search", searchListing) // to be updated

module.exports = router;