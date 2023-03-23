const mongoose = require("mongoose")
const {Schema} = mongoose

const accountSchema = new Schema({

})

const Account = mongoose.model("Account", accountSchema)
module.exports = Account