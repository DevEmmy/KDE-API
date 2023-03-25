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
    websiteUrl: String,
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
    
    savedListing: [{type: Schema.Types.ObjectId, ref: "Listing"}],
    pageViews: {
        value: {type: Number, default: 0},
        users: [{type: Schema.Types.ObjectId, ref: "User"}]
    },
    totalSaved: {
        value: {type: Number, default: 0},
        users: [{type: Schema.Types.ObjectId, ref: "User"}]
    },
    nationality: {type: String},
    stateOfResidence: {type: String},
    


    // For verification
    isVerified: {type: Boolean, default:false},
    verificationType: {type: Number},
    verificationId:  {type: Object, default: null},
    verifiedProfilePicture: {type: String, default: null},

    profilePicture: {type: String, default:"https://avatarfiles.alphacoders.com/865/86518.png"},
    gender: {type: String, default:null},
    balanceAmount: Number,
    zipCode: Number,

    // for bank details
    accountNo: {type: Number},
    bankName: String,
    accountName: {type: String},
    userType: {type: Number, default: 0},

    //auth
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    //type of account
    accountType: {type: Number, default: 0},
    subscribed: {type: Boolean, default: false},
    noOfSubscription: {type: Number, default: 0},
    totalListing: {type: Number, default: 0},
    sellerType: {type: Number, default: 0},

    locationISO: {type: String}
},
{
    timestamps: true,
})

const User = mongoose.model("User", userSchema);
module.exports = User