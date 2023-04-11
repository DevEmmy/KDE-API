const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User"},
    amount: {type:Number},
    credit: {type:Boolean, default: false},
    message: String,
    transaction_ref: String,
},{
    timestamps: true,
})

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction