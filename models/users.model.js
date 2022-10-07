const mongoose = require("mongoose");

//defining schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, require: true},
    lastName:  {type: String, require: true},
    otherNames: {type: String},
    sex: String,
    dob: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    password:  {type: String, require: true},
    isAdmin: {type:Boolean, default: false},
    isSeller:  {type: Boolean, default: false},
    savedListing: {type: Schema.Types.ObjectId, ref: "Listing"},
    nationality: {type: String},
    stateOfResidence: {type: String},
    isVerified: {type: String, require: true},
    verificationId:  {type: String, require: true},
    profilePicture: {type: String, default:null},
    governmentId: {type:Object},
    pronoun: {type: String, require: true},
    balanceAmount: Number,
},
{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
module.exports = User