const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User"},
    accountBalance: {type: Number},
    subjectAmount: {type:Number},
    credit: {type:Boolean, default: false},
    subjectUser:{type: Schema.Types.ObjectId, ref:"User"},
},{
    timestamps: true,
})

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction