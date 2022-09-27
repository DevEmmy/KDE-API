const mongoose = require("mongoose");

const { Schema } = mongoose;

const listingSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    title: {type: String, require:true},
    location: {type: String, require:true},
    postedBy: {type: Schema.Types.ObjectId, ref:"User"},
    features: {type:Array},
    description: {type: String, require:false},
    images: {type: Array, require: true},
    videos: {type: Array, require: true},
    available: {type: Boolean, default: true},
    price: Number,
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
