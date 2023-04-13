const { getAllTransactions, postTransaction, deleteTransaction, payForList, makeALuxuryPurchase, changeTransactionStatus } = require("../controllers/transactionsControllers");
const requireLogin = require("../middlewares/requireLogin");

const router = require("express").Router();

router.get("/all-transactions", requireLogin, getAllTransactions)

router.post("/make-transaction", requireLogin, postTransaction)

router.post("/pay-for-list", requireLogin, payForList)

router.post("/make-luxury-purchase", requireLogin, makeALuxuryPurchase)

router.patch("/update-status/:id", requireLogin, changeTransactionStatus)
// router.delete("/:id", requireLogin, deleteTransaction)

module.exports = router