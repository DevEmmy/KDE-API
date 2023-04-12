const mongoose = require("mongoose");

const { Schema } = mongoose;

// let transactionStatus = {
//     "PENDING": "PENDING",
//     "SUCCESSFUL": "SUCCESSFULL",
//     "FAILED": "FAILED"
// }

const transactionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User"},
    amount: {type:Number},
    credit: {type:Boolean, default: false},
    message: String,
    transaction_ref: String,
    status: {type: Number, default: 1}
},{
    timestamps: true,
})

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction