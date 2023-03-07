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

const editCategory = async (req, res)=>{
    
}

module.exports = {

}