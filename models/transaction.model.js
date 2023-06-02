const mongoose = require("mongoose");

const { Schema } = mongoose;

// let transactionStatus = {
//     "PENDING": "PENDING",
//     "SUCCESSFUL": "SUCCESSFULL",
//     "FAILED": "FAILED"
// }

const transactionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User"},
    amount: {type:String},
    credit: {type:Boolean, default: false},
    message: String,
    transaction_ref: String,
    transaction_type: String
},{
    timestamps: true,
})

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction