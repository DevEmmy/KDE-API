const router = require("express").Router()
const {testCreateAccount} = require("../controllers/accountController")

router.post("/test", testCreateAccount)

module.exports = router