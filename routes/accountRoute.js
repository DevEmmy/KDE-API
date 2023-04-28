const router = require("express").Router()
const {testCreateAccount, getBalance, transferFund, withdrawFund, getAccount} = require("../controllers/accountController")
const requireLogin = require("../middlewares/requireLogin")

router.post("/test", testCreateAccount)
router.get("/get-balance", getBalance)
router.post("/transfer-fund", transferFund)
router.post("/withdraw", requireLogin, withdrawFund)
router.post("/get-account", requireLogin, getAccount)

module.exports = router