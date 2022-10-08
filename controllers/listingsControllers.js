const User = require("../models/users.model");
const Listing = require("../models/listings.model")

const getAllListing = async (req, res)=>{
    await Listing.find().populate("postedBy")
    .then(resp=> res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const uploadAList = async (req, res)=>{
    const list = req.body;
    list.postedBy = req.user;
    await new Listing(list).save()
    .then(resp => res.json({message: "Successful"}))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const deleteList = async (req, res)=>{
    const id = req.params;
    await Listing.findById(id).populate("postedBy")
    .then(list =>{
        if(list.postedBy._id == req.user._id || req.user.isAdmin){
            Listing.findByIdAndDelete(id)
            .then(resp => res.json({message: "Listing Deleted"}))
            .catch(error => res.json({message: "An Error Occured", error: error}))
        }
    })   
}

const updateList = async (req, res)=>{
    const id = req.params;
    const toUpdate = req.body;
    await Listing.findByIdAndUpdate(id, toUpdate, {new:true})
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const makeUnavailable = async (req, res)=>{
    const id = req.params;
    await Listing.findById(id).populate("postedBy")
    .then(list =>{
        if(list.postedBy._id == req.user._id || req.user.isAdmin){
            list.available = !list.available
            Listing.findByIdAndUpdate(id, list, {new: true}).populate("postedBy")
            .then(resp => {res.json(resp)})
            .catch(error => res.json({message: "An Error Occured", error: error}))
        }
    })   
}

module.exports = {getAllListing, uploadAList, deleteList, updateList, makeUnavailable}