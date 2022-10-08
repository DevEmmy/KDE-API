const { getAllTransactions, postTransaction, deleteTransaction } = require("../controllers/transactionsControllers");
const requireLogin = require("../middlewares/requireLogin");

const router = require("express").Router();

router.get("/all-transactions", requireLogin, getAllTransactions)
router.post("make-transaction", requireLogin, postTransaction)
router.delete("/:id", requireLogin, deleteTransaction)

module.exports = router