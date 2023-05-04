const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const jwt_secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { cloudinary } = require("./cloudinary");
const { saveNotification } = require("./notificationsControllers");
const { sendMail } = require("./nodemailer");
const { reset_html } = require("../html_templates/html");
const { initiateCart } = require("./cartController");
const Verification = require("../models/verification.model");
const Account = "../models/account.model"

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
            .then(async doMatch =>{
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
    let user = await User.findOne({email: userDetails.email})
    if(user){
        res.status(403).json({message: "This Email is attached to an account"})
    }

    else{
        let hashed = await bcrypt.hash(password, 4)
        userDetails.password = hashed;
        let newUser = new User(userDetails);
        newUser = await newUser.save();
        const token = jwt.sign({_id:newUser._id}, jwt_secret);
        await initiateCart(newUser);
        res.json({token: token, message:"Successful", user: newUser});
    }
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

    try{
        let details = {
            number: updatedProfile.phoneNumber1,
            firstName: updatedProfile.firstName,
            lastName: updatedProfile.lastName,
            middleName: updatedProfile.middleName,
            gender: updatedProfile.sex,
            address: updatedProfile.address,
            email: updatedProfile.email,
            city: updatedProfile.city,
            state: updatedProfile.state,
            country: updatedProfile.country,
            title: updatedProfile.title,
            userId: user._id
        }
        // let account = await Account.findOne({user: user})
        // if(!account){
        //     let newAccount = await createAccount(details)
        //     console.log(newAccount)
        // }
        
        let response = await User.findByIdAndUpdate(user._id, updatedProfile, {new: true})
        res.json(response)
    }
    catch(error){
        res.status(400).json({message: "An Error Occured", error: error})
    }
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

const getUserByIdFnc = async (id)=>{
    let user = await User.findById(id)
    return user
}


const verifyUser = async (req, res)=>{
    const user = req.user
    let verification = {}
    const {verificationId, nationality, verificationType, verifiedProfilePicture} = req.body
    
    if(verificationType && verifiedProfilePicture){
        user.verificationId = {
            front: upload(verificationId.front),
            back: upload(verificationId.back),
        }
        verification.verifiedProfilePicture = upload(verifiedProfilePicture)
        verification.nationality = nationality;
        verification.verificationType = verificationType
        verification.isVerified = true
        verification.user = user._id
        user.accountType = 1
        
        
        try{
            let updatedUser = await User.findByIdAndUpdate(user._id, user)
            verification = await new Verification(verification).save()
            console.log(verification)
            res.json(updatedUser)
        }
        catch(err){
            res.status(err.status).json({message: err.message})
        }
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
            
            user.pageViews.value += 1
            console.log("hek")
            let i =  user.pageViews.users.indexOf(loggedUser._id);
            console.log(i)

            if(i === -1){
                user.pageViews.users.push(loggedUser._id);
            }
            else{
                // user.pageViews.users.splice(i, 1);
            }
            console.log(user.pageViews.users.length)

            User.findByIdAndUpdate(id, user, {new: true})
            .then(resp =>{
                
                let notification = {
                    sender: loggedUser,
                    title: "Profile View",
                    message: `Someone just viewed your profile. You now have ${user.pageViews.value} viewers on your profile`,
                    type: 0,
                    receiver: id
                }
                saveNotification(notification, res)
                // res.json(resp.pageViews)
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

const generatePasswordResetToken = async (email, res) => {
    const user = User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
  
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
   await User.findOneAndUpdate({ email }, user)
    .then(async user => {
        // console.log(user.firstName)
        await sendMail(email, "King David Elite", "Your Password Reset Token", reset_html(user, token), res);
   
    })
    // .catch(err => res.json(err))
  
  
    // const mailOptions = {
    //   to: email,
    //   from: process.env.GMAIL_USER,
    //   subject: 'Your Password Reset Token',
    //   text: `Hi ${user.name},\n\nYou are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${process.env.CLIENT_URL}/reset/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    // };
    
     return {
        message: "Check your mail for reset link"
     }
  };


const forgottenPassword = async (req, res)=>{
    try{
        await generatePasswordResetToken(req.body.email, res)
        // res.json({message: "Chcek your email for reset link"});
    }
    catch(err){
        res.status(500).json(err)
    }
    
}

const resetPassword = async (token, password, res) => {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  
    if (!user) {
      throw new Error('Password reset token is invalid or has expired');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await User.findOne({resetPasswordToken: token})
    .then(user => res.json(user))
    .catch(err => res.json(err))
  };


const reset_password = async (req, res)=>{
    const {token, password} = req.body;
    resetPassword(token, password, res)
}

const changeAccountType = async (req, res)=>{
    const loggedUser = req.user;
    const {accountType} = req.body
    if(accountType){
       loggedUser.accountType = accountType
    await User.findByIdAndUpdate(loggedUser._id, loggedUser, {new: true})
    .then(resp => res.json(
        {message: "Updated Successfully",
        user: resp
    }))
    .catch(err => res.json(err)) 
    }
    else{
        res.status(400).json("Account Type wasn't parsed")
    }
}

const selectSellerType = async (req, res)=>{
        const loggedUser = req.user
        const {sellerType} = req.body;
        if(sellerType){
            loggedUser.sellerType = sellerType
         await User.findByIdAndUpdate(loggedUser._id, loggedUser, {new: true})
         .then(resp => res.json(
             {message: "Updated Successfully",
             user: resp
         }))
         .catch(err => res.json(err)) 
         }
         else{
             res.status(400).json("Seller Type wasn't parsed")
         }
}



module.exports = {getAllUsers, signIn, signUp, updateUserTypeToSeller, deleteAccount, updateProfile, addToSaved, getSignedInUser, getUserById, verifyUser, updateBankDetails, viewProfile, viewProfilePage, forgottenPassword, reset_password, changeAccountType, selectSellerType, getUserByIdFnc}