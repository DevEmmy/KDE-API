const User = require("../models/users.model")
const Transaction = require("../models/transaction.model")


const getAllTransactions = async (req, res)=>{
    const user = req.user;
    Transaction.find({user: user}).populate("subjectUser")
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const postTransaction = async (req, res)=>{
    const transaction = req.body;
    transaction.user = req.user;
    new Transaction(transaction).save()
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

module.exports = {getAllTransactions, postTransaction, deleteTransaction}