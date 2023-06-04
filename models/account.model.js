const mongoose = require("mongoose")
const {Schema} = mongoose

const accountSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User", nullable: false, unique: true, require: true},
    account_number: String,
    account_name: String,
    bank_code: String,
    account_reference: String,
    bank_name: {type:String, default: "Fidelity Bank Limited"},
    account_balance: {type: Number, default: 0}
})

const Account = mongoose.model("Account", accountSchema)
module.exports = Account