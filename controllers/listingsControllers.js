const User = require("../models/users.model");
const Listing = require("../models/listings.model");
const { cloudinary } = require("./cloudinary");

const getAllListing = async (req, res)=>{
    await Listing.find().populate("postedBy")
    .then(resp=> res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const getAList = async (req, res)=>{
    const {id} = req.params;
    await Listing.findById(id).populate("postedBy")
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}

const getUserListing = async (req, res)=>{
    const user = req.user;
    await Listing.find({postedBy: user}).populate("postedBy")
    .then(resp=> res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const newA = async (images, option)=>{
    let i=0;
    const ims = []
    while (i<images.length){
        console.log("working")
        await cloudinary.uploader.upload(images[i].base64, option)
        .then(resp =>{
            ims.push(resp.secure_url)
            console.log("done")
            i++
        })
        .catch(err => console.log(err))
    }
    return ims
}

const uploadAList = async (req, res)=>{
    res.setTimeout(10000000, () => {
        let err = new Error('Service Unavailable');
        err.status = 503;
        console.log(err)
    });

    const list = req.body;
    list.postedBy = req.user;
    // console.log(newA(list.images))
    list.images = await newA(list.images)
    list.videos = await newA(list.videos, {
        resource_type: "video",
        format: "mp4"
    })
    console.log(list.images)
    new Listing(list).save()
    .then(resp => res.json({message: "Successful", list: resp}))
    .catch(error => res.json({message: "An Inner Error Occured", error: error}))

    // await newA(list.images)
    // .then((images)=>
    //     {
    //     list.images = images;
       
    // )
    // .catch(error => res.json({message: "An Error Occured", error: error}))
}

const deleteList = async (req, res)=>{
    const {id} = req.params;
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
    const {id} = req.params;
    const toUpdate = req.body;
    await Listing.findByIdAndUpdate(id, toUpdate, {new:true})
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const makeUnavailable = async (req, res)=>{
    const {id} = req.params;
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

const viewAList = async (req, res)=>{
    const {id} = req.params;
    const user = req.user
    Listing.findById(id)
    .then(list =>{
        list.views.push(user._id)
        Listing.findByIdAndUpdate(id, list, {new:true}).populate("postedBy").populate("views")
    })
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const saveList = async (req, res)=>{
    const loggedUser = req.user
    const {id} = req.params;
    var listing = Listing.findById(id)
    try{
        if(listing.thoseWhoSaved.indexof(loggedUser._id) == -1){
            listing.thoseWhoSaved.push(loggedUser._id)
            Listing.findByIdAndUpdate(id, listing, {new:true})
            .then(resp => {
                User.findById(loggedUser._id)
                .then(user => {
                    user.saved.push(id)
                    User.findByIdAndUpdate(id, user, {new:true})
                    .then(resp =>{
                        res.json({status: "Status"})
                    })
                })
            })
            .catch(error => res.json({message: "An Error Occured", error: error}))
        }
        else{
            listing.thoseWhoSaved = listing.thoseWhoSaved.filter(id => String(id) != String(loggedUser._id))
            Listing.findByIdAndUpdate(id, listing, {new:true})
            .then(resp => {
                User.findById(loggedUser._id)
                .then(user => {
                    user.saved = user.saved.filter(list => String(list) !== String(id))
                    User.findByIdAndUpdate(id, user, {new:true})
                    .then(resp =>{
                        res.json({status: "Unsaved"})
                    })
                })
            })
            .catch(error => res.json({message: "An Error Occured", error: error}))
        }
        
    }
    catch(err){
        res.status(400).json(err)
    }
}



module.exports = {getAllListing, uploadAList, deleteList, updateList, makeUnavailable, getUserListing, getAList, viewAList}