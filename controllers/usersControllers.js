const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config
const jwt_secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { cloudinary } = require("./cloudinary");
const { saveNotification } = require("./notificationsControllers");

const upload = async (data)=>{
    let url;
    await cloudinary.uploader.upload(data)
    .then(resp => {
        url = resp.secure_url;
    })
    .catch(err => console.log(err))
    return url;
}

const getAllUsers = async (req, res)=>{
    // if(req.user?.isAdmin){
        await User.find()
        .then(resp=>{
            res.json({users: resp, message: "Successful"})
        })
        .catch(err=>{
            res.json({message: "An Error Occured", error: err})
        })
    // }
    // else{
    //     res.json({message: "You are not Admin"})
    // }
}

const getSignedInUser = async (req, res)=>{
    await User.findOne({_id:req.user?._id})
    .then(resp => res.json(resp))
    .catch(err => res.status(400).json(err))
}

const signIn = async (req, res)=>{
    const {email, password} = req.body;
    await User.findOne({email})
    .then(user=>{
        if(!user){
            res.json({message: "There is no user with this Email"})
        }
        else{
            bcrypt.compare(password, user.password)
            .then(doMatch =>{
                if(doMatch){
                    const token = jwt.sign({_id: user._id}, jwt_secret)
                    res.json({token: token, message: "Signed In Successfully", user: user})
                }
                else{
                    res.status(403).json({message: "Wrong Password"})
                }
            })
        }
    })
    .catch(err => res.status(400).json(err))
}

const signUp = async (req, res)=>{
    const userDetails = req.body;
    const {password} = req.body
    User.findOne({email: userDetails.email})
    .then(resp =>{
        if(!resp){
            bcrypt.hash(password, 8)
    .then(hashedPassword => {
        userDetails.password = hashedPassword;
        const newUser = new User(userDetails);
        newUser.save()
        .then(resp =>{
            User.findById(resp._id)
            .then(user=>{
                if(!user){
                    res.json({message: "An Error Occured"})
                }
                else{
                    bcrypt.compare(password, user.password)
                    .then(doMatch=>{
                        if(doMatch){
                            const token = jwt.sign({_id:user._id}, jwt_secret);
                            res.json({token: token, message:"Successful", user: user})
                        }
                        else{
                            res.json({message: "Wrong Password"})
                        }
                    })
                }
            })
        })
        .catch(err => res.status(400).json({
            error: err, 
            message: "An Error Occured"
        }))
    }).catch(err => res.status(400).json({
        error: err, 
        message: "An Error Occured"
    }))
    }
    else{
        res.status(403).json({message: "This email is attached to an account"})
    }

}).catch(err => res.status(400).json(err))
}

const updateUserTypeToSeller = async (req, res)=>{
    const user = req.user;
    await User.findById(user._id)
    .then(userResponse =>{
        userResponse.isSeller = true;
        User.findByIdAndUpdate(user._id, userResponse, {new: true})
        .then(updated => res.json(updated))
        .catch(err => res.status(400).json(err))
    })
    .catch(error => res.status(403).json({message: "An Error Occured", error: error}))
}

const deleteAccount = async (req, res)=>{
    const user = req.user;
    await User.findByIdAndRemove(user._id)
    .then(userResponse =>{
        res.json({message: "User Account Deleted"})
    })
    .catch(error => res.status(400).json({message: "An Error Occured", error: error}))
}

const updateProfile = async (req, res)=>{
    const user = req.user;
    const updatedProfile = req.body
    if(updatedProfile.profilePicture){
        updatedProfile.profilePicture = await upload(updatedProfile.profilePicture)
    }
    if(updatedProfile.cover){
        updatedProfile.cover = await upload(updatedProfile.cover)
    }
    await User.findByIdAndUpdate(user._id, updatedProfile, {new: true})
    .then(resp => res.json(resp))
    .catch(error => {
        res.status(400).json({message: "An Error Occured", error: error})
    })
}

const addToSaved = async (req, res)=>{
    const user = req.user;
    const listing = req.body.listing;
    await User.findById(user._id)
    .then(userResponse =>{
        userResponse.savedListing.push(listing)
        User.findByIdAndUpdate(user._id, userResponse, {new:true})
        .then(resp=> res.json(resp))
        .catch(error => res.status(400).json({message: "An Error Occured", error: error}))
    })
    .catch(error => res.status(400).json({message: "An Error Occured", error: error}))
}

const getUserById = async (req, res)=>{
    const {id} = req.params
    await User.findById(id)
    .then(resp => {res.json(resp);})
    .catch(err => res.json(err))
}


const verifyUser = async (req, res)=>{
    const user = req.user
    const {verificationId, nationality, verificationType, verifiedProfilePicture} = req.body
    if(verificationId && verifiedProfilePicture && verifiedProfilePicture){
        const verification ={nationality: nationality, verificationType: verificationType}
        verification.verificationId = {
            front: upload(verificationId.front),
            back: upload(verificationId.back),
        }
        verification.verifiedProfilePicture = upload(verifiedProfilePicture)
        User.findByIdAndUpdate(user._id, verification, {new: true})
        .then(resp =>{
            res.status(200).json(resp)
        })
        .catch(err => res.status(400).json(err))
    }
    else{
        res.status(400).json({message: "Verification ID and Profile Picture are required"})
    }
}

const updateBankDetails = async (req, res)=>{
    const bankDetails = req.body;
    const user = req.user;
    User.findByIdAndUpdate(user._id, user, {new: true})
    .then(resp => res.json({
        message: "Updated Successfully",
        user: resp
    }))
    .catch(err =>{
        res.status(400).json({message: "An error occurred", error: err});
        console.log(err)
    })
}

const viewProfile = async (req, res)=>{
    const loggedUser = req.user;
    const {id} = req.params;
    if(loggedUser._id !== id){
        User.findById(id)
        .then(user => {
            user.pageViews += 1
            User.findByIdAndUpdate(id, user, {new: true})
            .then(resp =>{
                let notification = {
                    sender: loggedUser,
                    title: "Profile View",
                    message: `Someone just viewed your profile. You now have ${user.viewed} viewers on your profile`,
                    type: 0,
                    receiver: id
                }
                saveNotification(notification, res)
            })
            .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
    }
}

const viewProfilePage = async (req, res)=>{
    const id = req.params.id;
    User.findById(id)
    .then(user => {
        user.pageViews += 1;
        User.findByIdAndUpdate(id, user, {new:true})
        .then(resp => res.json({message: "You just view a profile"}))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
}

module.exports = {getAllUsers, signIn, signUp, updateUserTypeToSeller, deleteAccount, updateProfile, addToSaved, getSignedInUser, getUserById, verifyUser, updateBankDetails, viewProfile, viewProfilePage}