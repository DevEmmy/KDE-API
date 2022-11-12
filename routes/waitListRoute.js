const { inputDetails, getAllDetails } = require("../controllers/waitListControllers");

const router = require("express").Router();

router.post("/", inputDetails)
router.get("/", getAllDetails)

module.exports = router;