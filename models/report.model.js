const mongoose = require("mongoose");
const {Schema} = mongoose

const reportSchema = new Schema({
    message: String,
    listing: {type: Schema.Types.ObjectId, ref: "Listing"},
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

const Report = mongoose.model("Report", reportSchema)
module.exports = Report