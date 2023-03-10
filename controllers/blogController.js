const Blog = require("../models/blog.model")

const getAllBlogs = async (req, res)=>{
        await Blog.find()
        .populate("author")
        .populate("category")
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err))
    }

const createBlog = async (req, res)=>{
    const payload = req.body;
    payload.author = req.user
    const newBlog = new Blog(payload);
    await newBlog.save()
    .then(blog => res.json(blog))
    .catch(err => res.json(err))
}

const getABlogBySlug = async (req, res)=>{
    const {slug} = req.params;
    await Blog.findOne({slug: slug})
    .populate("author")
    .populate("category")
    .then(blog => res.json(blog))
    .catch(err => res.json(err))
}

const deleteBlog = async (req, res)=>{
    const {slug} = req.params;
    await Blog.findOneAndDelete({slug: slug})
    .populate("author")
    .populate("category")
    .then(blog => res.json("Delete Successfully"))
    .catch(err => res.json(err))
}

const updateBlog = async (req, res)=>{
    const {slug} = req.params;
    const content= req.body;
    await Blog.findOneAndUpdate({slug: slug}, content, {new: true})
    .populate("author")
    .populate("category")
    .then(blog => res.json("Updated Successfully"))
    .catch(err => res.json(err))
}

module.exports = {
    getAllBlogs, getABlogBySlug, deleteBlog, updateBlog, createBlog
}