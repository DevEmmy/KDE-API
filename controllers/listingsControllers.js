const User = require("../models/users.model");
const Listing = require("../models/listings.model");
const { cloudinary } = require("./cloudinary");
const { saveNotification } = require("./notificationsControllers");
const Category = require("../models/categories.model");

const getAllListing = async (req, res) => {
    let {page, category} = req.query;
    const limit = 10
    category = await Category.findOne({slug: category})
    const length = (await Listing.find({category: category._id})).length

    await Listing.find({category: category._id}).populate("postedBy").skip(((page || 1) - 1) * limit)
    .limit(limit)
    .then(resp =>{
            console.log(resp)
             res.json({
            listings: resp,
            noOfListings: length
        })}
        )
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

    //category id should be parsed in the payload

    const list = req.body;
    list.postedBy = req.user;
    try{
        list.category = Category.findById(list.category)

        if(list.images.length > 0){
            list.images = await newA(list.images)
        }
        if(list.videos.length > 0){
            list.videos = await newA(list.videos, {
            resource_type: "video",
            format: "mp4"
        })
        }
    
    new Listing(list).save()
        .then(resp =>{ 
            let loggedUser = req.user
            loggedUser.totalListing +=1;
            User.findByIdAndUpdate(loggedUser._id, loggedUser, {new: true})
            .then(user => res.json({ message: "Successful", list: resp }))
        })
        .catch(error => res.json({ message: "An Inner Error Occured", error: error }))
    }
    catch(error){
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
            
            const index = list.views.indexOf(user._id);
        if(index == -1){
            list.views.push(user._id)
            if(String(list.postedBy._id) != user._id){
                console.log(String(list.postedBy._id))
               Listing.findByIdAndUpdate(id, list, { new: true }).populate("postedBy").populate("category").populate("views")
                .then(resp => {
                    
                    let notification = {
                        sender: user,
                        title: "Your List was viewed",
                        message: `${user.firstName} viewed your listing, ${list.title}`,
                        type: 1,
                        link: `/${resp.category.slug}/${list._id}`,
                        receiver: list.postedBy
                    }
                    saveNotification(notification)
                    res.json({status: 1})
                })
                .catch(error => res.json({ message: "An Error Occured", error: error })) 
            }
        }
        else{
            list.views.splice(index, 1)
            Listing.findByIdAndUpdate(id, list, { new: true }).populate("postedBy").populate("views")
            .then(resp => {
                res.json({message: "This list has been viewed"})
            })
            .catch(error => res.json({ message: "An Error Occured", error: error }))
        }   
        })
        .catch(error => res.json({ message: "An Error Occured", error: error }))
}


const saveList = async (req, res)=>{
    const loggedUser = req.user;
    const listId = req.params.id

    Listing.findById(listId).populate("category")
    .then(listing => {
        if(listing){
            const index = listing.thoseWhoSaved.indexOf(loggedUser._id);
        if(index == -1){
            listing.thoseWhoSaved.push(loggedUser._id)
        }
        else{
            listing.thoseWhoSaved.splice(index, 1)
        }

        Listing.findByIdAndUpdate(listId, listing, {new: true})

        User.findById(loggedUser._id)
        .then(user => {
            // console.log(user)
            const i = user.savedListing.indexOf(listId)
            if(i == -1){
                
                user.savedListing.push(listId)
            }
            else{
                user.savedListing.splice(i, 1)
            }
            User.findByIdAndUpdate(user._id, user, {new: true})
        })

        User.findById(listing.postedBy)
        .then(user =>{
            user.totalSaved.value += 1;

            let index = user.totalSaved.users.indexOf(loggedUser._id)
            // console.log(loggedUser._id)
            // console.log(user.totalSaved.users[index])
            if(index == -1){
                user.totalSaved.users.push(loggedUser)
                
            let notification = {
                sender: loggedUser,
                title: "Your List was Saved",
                message: `${loggedUser.firstName} saved your listing, ${listing.title}`,
                type: 1,
                link: `/${listing.category.slug}/${listing._id}`,
                receiver: listing.postedBy
            }
            saveNotification(notification)
            res.json({status: 1})
            }
            else{
                user.totalSaved.users.splice(index, 1)
                res.json({status:0})
            }

            User.findByIdAndUpdate(user._id, user, {new: true})
            .then(resp => {
                console.log(resp.totalSaved.users)
            })

            
        } )
        }
        else{
            res.status(400).json({message: "Property Not Found"})
        }
    })
    .catch(err => res.json(err))

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


module.exports = { getAllListing, uploadAList, deleteList, updateList, makeUnavailable, getUserListing, getAList, viewAList, searchListing, saveList }