const User = require("../models/users.model")
const Transaction = require("../models/transaction.model")
const { initiateTransaction } = require("./accountController")
const { createLuxuryService } = require("./luxuryController")
const Listing = require("../models/listings.model")
const Cart = require("../models/cart.model")
require("dotenv").config
const { v4: uuidv4 } = require('uuid');

const kde_account = process.env.KDE_ACCOUNT;
const kde_bank = process.env.KDE_BANK

const createTransaction = async (transaction)=>{
    const response = await new Transaction(transaction).save()
    return response
}

const getAllTransactions = async (req, res)=>{
    const user = req.user;
    await Transaction.find({user: user})
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const getATransaction = async (req, res)=>{
    const {id} = req.body;
    try{
        let transaction = await Transaction.findById(id)
    }
    catch(err){
        res.json(err.message).status(err.status)
    }

}

const postTransaction = async (req, res)=>{
    const transaction = req.body;
    transaction.user = req.user;
    await new Transaction(transaction).save()
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const changeTransactionStatus = async (req, res)=>{
    const {id} = req.params;
    const {status} = req.body;
    try{
        let transaction = await Transaction.findById(id);
        transaction.status = status;
        transaction = await Transaction.findByIdAndUpdate(id, transaction, {new: true})
        res.json(transaction)
    }
    catch(err){
        res.status(err.status).json(err.message)
    }
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

const payForList = async (req, res)=>{
    const {listId} = req.body;
    try{
       let listing = await Listing.findById(listId).populate("postedBy")
        let transaction = {}
        transaction.user = req.user;
        transaction.amount = listing.price;
        transaction.message = 
        `Purchasing a property of;
        id - ${listing._id},
        posted by - ${listing.firstName + " " + listing.lastName}
        title - ${listing.title}
        price - ${listing.amount}
        `
        transaction.transaction_ref = uuidv4()
        let response = await createTransaction(transaction)
        res.json({
            accountNumber: kde_account,
            bankName: kde_bank,
            accountName: "King David Elites",
            transaction_ref: transaction.transaction_ref,
            amount: transaction.amount
        }) 
    }
    catch(err){
        res.status(err.status).json(err.message)
    }
}

const makeALuxuryPurchase = async (req, res)=>{
    let loggedUser = req.user;
    let luxury = req.body;

    luxury = await createLuxuryService(luxury)
        // const response 

    let transaction = {
        user: loggedUser,
        amount: luxury.price,
        credit: false,
        message: `You Applied for a Luxury Service - ${luxury.serviceType} for ${luxury.servicePlan} plan`,
        transaction_ref: uuidv4()
    }

        transaction = await createTransaction(transaction)
        console.log(transaction)
        res.json({
            accountNumber: kde_account,
            bankName: kde_bank,
            accountName: "King David Elites",
            transaction_ref: transaction.transaction_ref,
            amount: transaction.amount
        })
}

const subscribe = async (req, res) => {

}


const checkOutCart = async (req, res)=>{
    const user = req.user;
    const cart = await Cart.findOne({user: user})

    let transaction = {
            user: loggedUser,
            amount: cart.total,
            credit: false,
            message: `You Purchased Some Collectibles:
            ${cart.collectibles.map((item, i)=>{
                return (
                    `${item.itemData.title + " " + "(" + item.quantity + ") ,"}`
                )
            })}
            `,
            transaction_ref: uuidv4()
    }
        transaction = await createTransaction(transaction)
        console.log(transaction)
        res.json(
            {
                accountNumber: kde_account,
                bankName: kde_bank,
                accountName: "King David Elites",
                transaction_ref: transaction.transaction_ref,
                amount: transaction.amount
            }
        )
    
    res.json({message: "Transaction Failed"})
}

module.exports = {getAllTransactions, postTransaction, deleteTransaction, createTransaction, makeALuxuryPurchase, checkOutCart, changeTransactionStatus, getATransaction, payForList}