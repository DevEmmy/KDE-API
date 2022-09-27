const mongoose = require("mongoose");

const { Schema } = mongoose;

const categoriesSchema = new Schema({
    title: String,
    slug: String,
},
{
    timestamps: true
})

const Category = mongoose.model("Category", categoriesSchema);
module.exports = Category;
