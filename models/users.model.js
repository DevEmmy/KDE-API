const mongoose = require("mongoose");

//defining schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: false},
    lastName:  {type: String, required: false},
    otherNames: {type: String},
    about: {type: String, default: "Hello there, I am using King David Elites."},
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
    
    savedListing: {type: Schema.Types.ObjectId, ref: "Listing"},
    nationality: {type: String},
    stateOfResidence: {type: String},


    // For verification
    isVerified: {type: String, default:false},
    verificationType: {type: Number},
    verificationId:  {type: Object, default: null},
    verifiedProfilePicture: {type: String, default: null},

    profilePicture: {type: String, default:"https://avatarfiles.alphacoders.com/865/86518.png"},
    pronoun: {type: String, default:null},
    balanceAmount: Number,
    zipCode: Number,

    // for bank details
    accountNo: {type: Number, unique: true},
    bankName: String,
    accountName: {type: String},
    userType: {type: Number, default: 0},
    saved: [{type: Schema.Types.ObjectId, ref: "Listing"}],
},
{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
module.exports = User