const mongoose = require("mongoose");
const {Schema}= mongoose;

const luxurySchema = new Schema({
    serviceType: String,
    servicePlan: String,
    price: Number,
    description: String,
    details: Array,
    features: Array,
    request: String,
    emergencyDetails: Object,
    guests: Array,
    user: {type: Schema.Types.ObjectId, ref: "User", require: true}
})

const Luxury = mongoose.model("Luxury", luxurySchema)
module.exports = Luxury