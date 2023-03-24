const router = require("express").Router()
const {testCreateAccount, getBalance} = require("../controllers/accountController")

router.post("/test", testCreateAccount)
router.get("/get-balance", getBalance)

module.exports = router