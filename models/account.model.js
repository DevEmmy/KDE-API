const mongoose = require("mongoose")
const {Schema} = mongoose

const accountSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User", nullable: false, unique: true, require: true},
    accountNumber: Number,
    accountName: String,
    accountCode: Number,
    customerEmail: String,
    bankName: {type:String, default: "Fidelity Bank Limited"},
    reference: String,
})

const Account = mongoose.model("Account", accountSchema)
module.exports = Account