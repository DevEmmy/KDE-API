const mongoose = require("mongoose");

const { Schema } = mongoose;

const memberSchema = new Schema({
    firstName: {type: String, require: true},
    lastName:  {type: String, require: true},
    whatsapp: String,
    twitter: String,
    linkedIn: String,
    role: String,
})

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;

