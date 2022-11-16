const mongoose = require("mongoose");

//defining schema
const Schema = mongoose.Schema;

const waitSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true}
},
{
    timestamps: true,
})

const WaitList = mongoose.model("WaitList", waitSchema)
module.exports = WaitList;