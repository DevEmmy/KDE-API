const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true, unique: true},
    total: {type: Number, default: 0},
    collectibles: [{
        itemData: {type: Schema.Types.ObjectId, ref: "Listing"},
        quantity: {type: Number, default: 0}
    }]
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart