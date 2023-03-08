const Category = require("../models/categories.model");

function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim whitespace
    str = str.toLowerCase(); // convert to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid characters
             .replace(/\s+/g, '-') // replace spaces with dashes
             .replace(/-+/g, '-'); // collapse multiple dashes
    return str;
  }

const addCategory = async (req, res)=>{
    const content = req.body;
    content.slug = slugify(content.title);
    const newCategory = new Category(content)
    await newCategory.save()
    .then(resp => res.json({message: "Successful"}))
    .catch(err => res.json(err))
}

const getById = async (req, res)=>{
    const {id} = req.params
    await Category.findById(id)
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

const editCategory = async (req, res)=>{
    const content = req.body;
    const id = req.params.id;
    await Category.findOneAndUpdate(id, content, {new: true})
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

const getAll = async (req, res)=>{
    await Category.find()
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

const deleteCategory = async (req, res)=>{
    const id = req.params.id;
    await Category.findByIdAndDelete(id)
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

module.exports = {
    addCategory, editCategory, getAll, deleteCategory, getById
}