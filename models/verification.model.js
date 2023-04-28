const mongoose = require("mongoose");

//defining schema
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    verificationType: {type: Number},
    verificationId:  {type: Object, default: null},
    verifiedProfilePicture: {type: String, default: null},
    nationality: String,
    status: {type: String, default: "PENDING"}
})

const Verification = mongoose.model("Verification", schema)
module.exports = Verification