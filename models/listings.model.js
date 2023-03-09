const mongoose = require("mongoose");

const { Schema } = mongoose;

const listingSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    title: {type: String, required:true},
    location: {type: String, required:true},
    postedBy: {type: Schema.Types.ObjectId, ref:"User", required: true},
    features: {type:Array},
    description: {type: String, required:false},
    images: {type: Array, required: false},
    videos: {type: Array, required: false},
    available: {type: Boolean, default: true},
    price: Number,
    attachedDocument: {type:Array},
    year: {type: Number},
    carCondition: String,
    engineType: String,
    colour: String,
    model: String,
    noOfBed: Number,
    noOfBathroom: Number,
    locationISO: string,
    views: [
        {type: Schema.Types.ObjectId, ref:"User"},
    ],
    thoseWhoSaved: [
        {type: Schema.Types.ObjectId, ref:"User"},
    ],
},
{
    timestamps: true
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
