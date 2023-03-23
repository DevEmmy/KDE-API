const { getAllReports, postReport } = require("../controllers/reportController")
const requireLogin = require("../middlewares/requireLogin")

const route = require("express").Router()

route.get("/all", getAllReports)
route.post("/", requireLogin, postReport)

module.exports = route