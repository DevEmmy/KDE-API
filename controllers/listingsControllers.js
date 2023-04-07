const User = require("../models/users.model");
const Listing = require("../models/listings.model");
const { cloudinary } = require("./cloudinary");
const { saveNotification } = require("./notificationsControllers");
const Category = require("../models/categories.model");
const detector = require("../utils/imageQualityDetector")

const getAllListing = async (req, res) => {
    let { page, category, forRent } = req.query;
    const limit = 3
    category = await Category.findOne({ slug: category })
    const length = (await Listing.find({ category: category._id,forRent: forRent || false })).length

    await Listing.find({ category: category._id, forRent: forRent || false }).populate("postedBy").populate("category").skip(((page || 1) - 1) * limit)
        .limit(limit)
        .then(resp => {
            // console.log(resp)
            res.json({
                listings: resp,
                noOfListings: length
            })
        }
        )
        .catch(error => res.json({ message: "An Error Occured", error: error }))
}

const getAList = async (req, res) => {
    const { id } = req.params;
    await Listing.findById(id).populate("postedBy").populate("category")
        .then(resp => res.json(resp))
        .catch(err => res.json(err))
}

const getUserListing = async (req, res) => {
    const user = req.user;
    const { id } = req.query;
    await Listing.find({ postedBy: (id || user._id) }).populate("postedBy").populate("category")
        .then(resp => res.json(resp))
        .catch(error => res.json({ message: "An Error Occured", error: error }))
}

const newA = async (images, option) => {
    let i = 0;
    const ims = []
    console.log(images.length)
    while (i < images.length) {
        console.log("working")
        if(images[i].base64){
            detector(images[i].base64)
            await cloudinary.uploader.upload(images[i].base64, option)
            .then(resp => {
            ims.push(resp.secure_url)
            console.log("done")
            })
            .catch(err => console.log("err"))
        }
        else{
            ims.push(images[i])
        }
        
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

    //category id should be parsed in the payload

    const list = req.body;

    list.postedBy = req.user;
    // list.collectibleFeatures = {
    //     "color": "red",
    //     "length": "2 Inches",
    //     "nature": "Fresh",
    //     "fav": "Johnny"
    // }
    try {
        list.category = await Category.findOne({ slug: list.category })

        if (list.images.length > 0) {
            list.images = await newA(list.images)
        }
        if (list.videos.length > 0) {
            list.videos = await newA(list.videos, {
                resource_type: "video",
                format: "mp4"
            })
        }
        console.log(list)
        let resp = await new Listing(list).save()
        let loggedUser = req.user
        loggedUser.totalListing += 1;
        let newUser = await User.findByIdAndUpdate(loggedUser._id, loggedUser, { new: true })
        res.json({
            message: "Successful",
            list: resp
        })
    }
    catch (error) {
        res.status(400).json(error)
    }

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
            else {
                res.status(403).json({ message: "You can't perform this operation" })
            }
        })
}

const updateList = async (req, res) => {
    const { id } = req.params;
    const toUpdate = req.body;
    toUpdate.category = await Category.findOne({ slug: toUpdate.category })
    if (toUpdate.images.length > 0) {
        toUpdate.images = await newA(toUpdate.images)
    }
    if (toUpdate.videos.length > 0) {
        toUpdate.videos = await newA(toUpdate.videos, {
            resource_type: "video",
            format: "mp4"
        })
    }
    await Listing.findByIdAndUpdate(id, toUpdate, { new: true }).populate("category")
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
    let loggedUser = req.user
    let list = await Listing.findById(id).populate("postedBy")
    const index = list.views.indexOf(loggedUser._id);
    console.log(list.views)
    if (index == -1) {
        list.views.push(loggedUser._id)
        if (list.postedBy._id != loggedUser._id) {
            console.log(list.postedBy._id)
            list = await Listing.findByIdAndUpdate(id, list, { new: true }).populate("postedBy").populate("category").populate("views")
                        
            let notification = {
                sender: loggedUser,
                title: "Your Listing was viewed",
                message: `${loggedUser.firstName + " " + loggedUser.lastName} viewed your listing, ${list.title}`,
                type: 1,
                link: `/${list.category.slug}/${list._id}`,
                receiver: list.postedBy
            }
            saveNotification(notification)
            res.json({message: "Viewed Successfuly"})        
        }
    }
    else{
        res.json({message: "Viewed Successfuly"})
    }
}


const saveList = async (req, res) => {
    let loggedUser = req.user;
    const listId = req.params.id

    let listing = await Listing.findById(listId).populate("category")

    if(listing){
        let loggedUserIndex = listing.thoseWhoSaved.indexOf(loggedUser._id)
        console.log(listing.thoseWhoSaved)
        console.log(loggedUserIndex)
        if(loggedUserIndex === -1){
            listing.thoseWhoSaved.push(loggedUser._id)
            console.log("saved1")
        }
        else {
            listing.thoseWhoSaved.splice(loggedUserIndex, 1)
        }
        const resp1 = await Listing.findByIdAndUpdate(listId, listing, { new: true })
        // console.log({thoseWhoSaved: resp1.thoseWhoSaved})

        let i = loggedUser.savedListing.indexOf(listId)
        if (i == -1) {
            loggedUser.savedListing.push(listId)
            console.log("saved2")
        }
        else {
            loggedUser.savedListing.splice(i, 1)
        }
        
        loggedUser = await User.findByIdAndUpdate(loggedUser._id, loggedUser, { new: true })
        // console.log({user: loggedUser.savedListing})

        let user = await User.findById(listing.postedBy._id)
        // console.log(user.firstName)
        let index = user.totalSaved.users.indexOf(String(loggedUser._id))
        let status = 0;
        console.log(user.totalSaved.users)
        console.log(index)
        // console.log(loggedUser._id)
        // console.log(user.totalSaved)

        if (index == -1) {
            user.totalSaved.users.push(loggedUser._id)
            user.totalSaved.value += 1;
            console.log("saved3")
        
            let notification = {
                sender: loggedUser,
                title: "Your Listing was saved",
                message: `${loggedUser.firstName + " " + loggedUser.lastName} saved your listing, ${listing.title}`,
                type: 1,
                link: `/${listing.category.slug}/${listing._id}`,
                receiver: user._id
            }
            saveNotification(notification)
            status = 1;
        }
        else {
            user.totalSaved.users.splice(index, 1)
            status = 0;
        }
        

        user = await User.findByIdAndUpdate(user._id, user, { new: true })
        // console.log(user)
        res.json({status})

    }
    else{

    }

}


const searchListing = async (req, res) => {
    const { price, location, noOfBed, forRent, colour, features, noOfBathroom, title, model, year, condition, category} = req.body
    let { page } = req.query;
    let limit = 3;

    let realEstateQuery = {
        price: price ? { $lte : price } : { $gte : "0"},
        noOfBed: noOfBed,
        forRent: forRent,
        location: location,
        noOfBathroom: noOfBathroom 
    }

    let carsQuery = {
        title: title,
        model: model,
        year: year,
        condition: condition,
        colour: colour
    }

    let totalQuery = {...realEstateQuery, ...carsQuery}
    totalQuery = Object.fromEntries(
        Object.entries(totalQuery).filter(([key, value]) => value !== undefined)
      );

    try{
        console.log(totalQuery)
        let listings = await Listing.find(totalQuery).populate("postedBy").populate("category").skip(((page || 1) - 1) * limit)
        .limit(limit)
        res.json(listings)
    }
    catch(err){
        res.status(400).json(err.message)
    }
    // if (title) {
    //     Listing.find({ title: { $regex: new RegExp("^" + title + ".*", "i") } })
    //         .populate("postedBy")
    //         .then(resp => res.json(resp))
    //         .catch(error => res.json({ message: "An Error Occured", error: error }))
    // }
    // else if (price) {
    //     Listing.find({ price: { $gte: 0, $lte: price } })
    //         .populate("postedBy")
    //         .then(resp => res.json(resp))
    //         .catch(error => res.json({ message: "An Error Occured", error: error }))
    // }
    // else if (noOfBed) {
    //     Listing.find({ noOfBed: { $gte: 0, $lte: noOfBed } })
    //         .populate("postedBy")
    //         .then(resp => res.json(resp))
    //         .catch(error => res.json({ message: "An Error Occured", error: error }))
    // }
    // else if (location) {
    //     Listing.find({ location: { $regex: new RegExp("^" + location + ".*", "i") } })
    //         .populate("postedBy")
    //         .then(resp => res.json(resp))
    //         .catch(error => res.json({ message: "An Error Occured", error: error }))
    // }
}

const getRentals = async (req, res)=>{
    let loggedUser = req.user;
    try{
        let listing = await Listing.find({forRent: true}).populate("postedBy").populate("category")
        res.json(listing)
    }
    catch(err){
        throw new Error(err.message)
    }
}


module.exports = { getAllListing, uploadAList, deleteList, updateList, makeUnavailable, getUserListing, getAList, viewAList, searchListing, saveList, getRentals }