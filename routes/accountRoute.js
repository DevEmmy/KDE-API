const router = require("express").Router()
const {testCreateAccount, getBalance, transferFund, withdrawFund, getAccount, confirmCreditting} = require("../controllers/accountController")
const requireLogin = require("../middlewares/requireLogin")

router.post("/test", testCreateAccount)
// router.get("/get-balance", getBalance)
router.post("/transfer-fund", transferFund)
// router.post("/withdraw", requireLogin, withdrawFund)
router.get("/get-account", requireLogin, getAccount)
router.get("/confirm-creditting", requireLogin, confirmCreditting)


module.exports = router