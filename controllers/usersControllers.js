const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const jwt_secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res)=>{
    if(req.user.isAdmin){
        await User.find()
        .then(resp=>{
            res.json({users: resp, message: "Successful"})
        })
        .catch(err=>{
            res.json({message: "An Error Occured", error: err})
        })
    }
    else{
        res.json({message: "You are not Admin"})
    }
}

const signIn = async (req, res)=>{
    const {email, password} = req.body;
    await User.findOne({email})
    .then(user=>{
        if(!user){
            res.json({message: "There is no user with this message"})
        }
        else{
            bcrypt.compare(password, user.password)
            .then(doMatch =>{
                if(doMatch){
                    const token = jwt.sign({_id: user._id}, jwt_secret)
                    res.json({token: token, message: "Signed In Successfully"})
                }
                else{
                    res.json({message: "Wrong Password"})
                }
            })
        }
    })
}

const signUp = async (req, res)=>{
    const userDetails = req.body;
    const {password} = req.body
    await bcrypt.hash(password, 8)
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
                            res.json({token: token, message:"Successful"})
                        }
                        else{
                            res.json({message: "Wrong Password"})
                        }
                    })
                }
            })
        })
        .catch(err => ({
            error: err, 
            message: "An Error Occured"
        }))
    }).catch(err => ({
        error: err, 
        message: "An Error Occured"
    }))

}

const updateUserTypeToSeller = async (req, res)=>{
    const user = req.user;
    await User.findById(user._id)
    .then(userResponse =>{
        userResponse.isSeller = true;
        res.json(userResponse)
    })
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const deleteAccount = async (req, res)=>{
    const user = req.user;
    await User.findByIdAndRemove(user._id)
    .then(userResponse =>{
        res.json({message: "User Account Delete"})
    })
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const updateProfile = async (req, res)=>{
    const user = req.user;
    const updatedProfile = req.body
    await User.findByIdAndUpdate(user._id, updatedProfile, {new: true})
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const addToSaved = async (req, res)=>{
    const user = req.user;
    const listing = req.body.listing;
    await User.findById(user._id)
    .then(userResponse =>{
        userResponse.savedListing.push(listing)
        User.findByIdAndUpdate(user._id, userResponse, {new:true})
        .then(resp=> res.json(resp))
        .catch(error => res.json({message: "An Error Occured", error: error}))
    })
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

module.exports = {getAllUsers, signIn, signUp, updateUserTypeToSeller, deleteAccount, updateProfile, addToSaved}