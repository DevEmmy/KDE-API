const User = require("../models/users.model");
const Listing = require("../models/listings.model");
const { cloudinary } = require("./cloudinary");
const { saveNotification } = require("./notificationsControllers")

const getAllListing = async (req, res) => {
    const {page, type} = req.query;
    const limit = 10
    const length = (await Listing.find({type: type})).length
    await Listing.find({type: type}).populate("postedBy").skip(((page || 1) - 1) * limit)
    .limit(limit)
        .then(resp => res.json({
            listings: resp,
            noOfListings: length
        }))
        .catch(error => res.json({ message: "An Error Occured", error: error }))
}

const getAList = async (req, res) => {
    const { id } = req.params;
    await Listing.findById(id).populate("postedBy")
        .then(resp => res.json(resp))
        .catch(err => res.json(err))
}

const getUserListing = async (req, res) => {
    const user = req.user;
    const { id } = req.query;
    await Listing.find({ postedBy: (id || user._id) }).populate("postedBy")
        .then(resp => res.json(resp))
        .catch(error => res.json({ message: "An Error Occured", error: error }))
}

const newA = async (images, option) => {
    let i = 0;
    const ims = []
    console.log(images.length)
    while (i < images.length) {
        console.log("working")
        await cloudinary.uploader.upload(images[i].base64, option)
            .then(resp => {
                ims.push(resp.secure_url)
                console.log("done")
            })
            .catch(err => console.log("err"))
            i++
    }
    return ims
}

const uploadAList = async (req, res) => {
    // res.setTimeout(10000000, () => {
    //     let err = new Error('Service Unavailable');
    //     err.status = 503;
    //     console.log(err)
    // });

    const list = req.body;
    if(list.colour){
        list.type=1
    }
    else{
        list.type=0
    }
    list.postedBy = req.user;
    // console.log(newA(list.images))
    // console.log(list.images)

    if(list.images.length > 0){
        list.images = await newA(list.images)
    }
    if(list.videos.length > 0){
        list.videos = await newA(list.videos, {
        resource_type: "video",
        format: "mp4"
    })
    }
    
    
    // console.log(list.images)
    new Listing(list).save()
        .then(resp => res.json({ message: "Successful", list: resp }))
        .catch(error => res.json({ message: "An Inner Error Occured", error: error }))

    // await newA(list.images)
    // .then((images)=>
    //     {
    //     list.images = images;

    // )
    // .catch(error => res.json({message: "An Error Occured", error: error}))
}

const deleteList = async (req, res) => {
    const { id } = req.params;
    await Listing.findById(id).populate("postedBy")
        .then(list => {
            if (String(list.postedBy._id) == (req.user._id || req.user.isAdmin)) {
                Listing.findByIdAndDelete(id)
                    .then(resp => res.json({ message: "Listing Deleted" }))
                    .catch(error => res.json({ message: "An Error Occured", error: error }))
            }
            else{
                res.status(403).json({message: "You can't perform this operation"})
            }
        })
}

const updateList = async (req, res) => {
    const { id } = req.params;
    const toUpdate = req.body;
    await Listing.findByIdAndUpdate(id, toUpdate, { new: true })
        .then(resp => res.json(resp))
        .catch(error => res.json({ message: "An Error Occured", error: error }))
}

const makeUnavailable = async (req, res) => {
    const { id } = req.params;
    await Listing.findById(id).populate("postedBy")
        .then(list => {
            if (list.postedBy._id == req.user._id || req.user.isAdmin) {
                list.available = !list.available
                Listing.findByIdAndUpdate(id, list, { new: true }).populate("postedBy")
                    .then(resp => { res.json(resp) })
                    .catch(error => res.json({ message: "An Error Occured", error: error }))
            }
        })
}

const viewAList = async (req, res) => {
    const { id } = req.params;
    const user = req.user
    Listing.findById(id).populate("postedBy")
        .then(list => {
            list.views.push(user._id)
            if(String(list.postedBy._id) != user._id){
                console.log(String(list.postedBy._id))
               Listing.findByIdAndUpdate(id, list, { new: true }).populate("postedBy").populate("views")
                .then(resp => {
                    let listType;
                    if (list.engineType != null) {
                        listType = "real-estate"
                    }
                    else {
                        listType = "cars"
                    }
                    let notification = {
                        sender: user,
                        title: "Your List was viewed",
                        message: `${user.firstName} viewed your listing, ${list.title}`,
                        type: 1,
                        link: `/${listType}/${list._id}`,
                        receiver: list.postedBy
                    }
                    saveNotification(notification, res)
                })
                .catch(error => res.json({ message: "An Error Occured", error: error })) 
            }
            
        })
        .catch(error => res.json({ message: "An Error Occured", error: error }))
}

const saveList = async (req, res) => {
    const loggedUser = req.user
    const { id } = req.params;
    var listing = Listing.findById(id)
    try {
        if (listing.thoseWhoSaved.indexof(loggedUser._id) == -1) {
            listing.thoseWhoSaved.push(loggedUser._id)
            Listing.findByIdAndUpdate(id, listing, { new: true })
                .then(resp => {
                    User.findById(loggedUser._id)
                        .then(user => {
                            user.saved.push(id)
                            User.findByIdAndUpdate(id, user, { new: true })
                                .then(resp => {
                                    let listType;
                            if (list.engineType != null) {
                                listType = "real-estate"
                            }
                            else {
                                listType = "cars"
                            }
                            let notification = {
                                sender: user,
                                title: "Your List was Saved",
                                message: `${user.firstName} saved your listing, ${list.title}`,
                                type: 1,
                                link: `/${listType}/${list._id}`,
                                receiver: list.postedBy
                            }
                            saveNotification(notification, res)
                                })
                        })
                })
                .catch(error => res.json({ message: "An Error Occured", error: error }))
        }
        else {
            listing.thoseWhoSaved = listing.thoseWhoSaved.filter(id => String(id) != String(loggedUser._id))
            Listing.findByIdAndUpdate(id, listing, { new: true })
                .then(resp => {
                    User.findById(loggedUser._id)
                        .then(user => {
                            user.saved = user.saved.filter(list => String(list) !== String(id))
                            User.findByIdAndUpdate(id, user, { new: true })
                                .then(resp => {
                                    res.json({ status: "Unsaved" })
                                })
                        })
                })
                .catch(error => res.json({ message: "An Error Occured", error: error }))
        }

    }
    catch (err) {
        res.status(400).json(err)
    }
}


const searchListing = async (req, res)=>{
    const {title, price, noOfBed, location} = req.query
    

    if(title){
        Listing.find({title: {$regex: new RegExp("^" + title + ".*", "i")}})
    .populate("postedBy")
        .then(resp => res.json(resp))
        .catch(error => res.json({ message: "An Error Occured", error: error }))
    }
    else if(price){
        Listing.find({price: { $gte: 0, $lte: price }})
    .populate("postedBy")
        .then(resp => res.json(resp))
        .catch(error => res.json({ message: "An Error Occured", error: error }))
    }
    else if(noOfBed){
        Listing.find({noOfBed: { $gte: 0, $lte: noOfBed }})
    .populate("postedBy")
        .then(resp => res.json(resp))
        .catch(error => res.json({ message: "An Error Occured", error: error }))
    }
    else if(location){
        Listing.find({location: {$regex: new RegExp("^" + location + ".*", "i")}})
    .populate("postedBy")
        .then(resp => res.json(resp))
        .catch(error => res.json({ message: "An Error Occured", error: error }))
    }
}


module.exports = { getAllListing, uploadAList, deleteList, updateList, makeUnavailable, getUserListing, getAList, viewAList, searchListing }