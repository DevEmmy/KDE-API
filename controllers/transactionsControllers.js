const User = require("../models/users.model")
const Transaction = require("../models/transaction.model")
const { initiateTransaction } = require("./accountController")
const { createLuxuryService } = require("./luxuryController")
require("dotenv").config

const createTransaction = async (transaction)=>{
    const response = await new Transaction(transaction).save()
    console.log("Transaction Su ccessful")
}

const getAllTransactions = async (req, res)=>{
    const user = req.user;
    await Transaction.find({user: user})
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const postTransaction = async (req, res)=>{
    const transaction = req.body;
    transaction.user = req.user;
    await new Transaction(transaction).save()
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const deleteTransaction = async (req, res)=>{
    const {id} = req.params;
    await Transaction.findById(id).populate("postedBy")
    .then(transaction =>{
        if(transaction.postedBy._id == req.user._id || req.user.isAdmin){
            Transaction.findByIdAndDelete(id)
            .then(resp => res.json({message: "transactioning Deleted"}))
            .catch(error => res.json({message: "An Error Occured", error: error}))
        }
    })   
}

const kde_account = process.env.KDE_ACCOUNT;
const kde_bank = process.env.KDE_BANK

const makeALuxuryPurchase = async (req, res)=>{
    let loggedUser = req.user;
    let luxury = req.body;

    const request={
        user: loggedUser,
        amount: luxury.price,
        destination_account: kde_account,
        destination_bank_code: kde_bank
    }

    let response = await initiateTransaction(request);
    if(response.status !== "Failed"){
        await createLuxuryService(luxury)
        res.json({message: "Transaction Successful"})
    }
    res.json({message: "Transaction Failed"})
}

module.exports = {getAllTransactions, postTransaction, deleteTransaction, createTransaction, makeALuxuryPurchase}