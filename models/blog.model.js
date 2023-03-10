const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    content: String,
    coverImg: String,
    slug: String,
    author: {type: Schema.Types.ObjectId, ref: "User"},
    category: {type: Schema.Types.ObjectId, ref: "Category"},
},
{
    timestamps: true
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog;