const mongoose = require("mongoose");

//defining schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: false},
    lastName:  {type: String, required: false},
    otherNames: {type: String},
    about: String,
    cover: {type: String, default:"https://avatarfiles.alphacoders.com/865/86518.png"},
    facebookUrl: String,
    instagramUrl: String,
    address: String,
    country: String,
    state: String,
    city: String,
    sex: String,
    dob: {type: String},
    email: {type: String, required: true},
    phoneNumber1: {type: String},
    phoneNumber2: {type: String},
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