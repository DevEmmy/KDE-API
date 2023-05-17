const { getVerificationStatus } = require("../controllers/verificationController");
const requireLogin = require("../middlewares/requireLogin");

const router = require("express").Router;

router.get('/my-status', requireLogin ,getVerificationStatus)

module.exports = router