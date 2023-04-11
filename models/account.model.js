const mongoose = require("mongoose")
const {Schema} = mongoose

const accountSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User", nullable: false, unique: true, require: true},
    account_number: Number,
    account_name: String,
    bank_code: String,
    account_reference: Number,
    bank_name: {type:String, default: "Fidelity Bank Limited"},
    accountBalance: {type: Number, default: 0}
})

const Account = mongoose.model("Account", accountSchema)
module.exports = Account