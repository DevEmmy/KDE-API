const mongoose = require("mongoose");

//defining schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName:  {type: String, required: true},
    otherNames: {type: String},
    sex: String,
    dob: {type: String},
    email: {type: String, required: true},
    phoneNumber: {type: String},
    password:  {type: String, required: true},
    isAdmin: {type:Boolean, default: false},
    isSeller:  {type: Boolean, default: false},
    savedListing: {type: Schema.Types.ObjectId, ref: "Listing"},
    nationality: {type: String},
    stateOfResidence: {type: String},
    isVerified: {type: String, default:false},
    verificationId:  {type: String, default: null},
    profilePicture: {type: String, default:"https://avatarfiles.alphacoders.com/865/86518.png"},
    governmentId: {type:Object},
    pronoun: {type: String, default:null},
    balanceAmount: Number,
},
{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
module.exports = User