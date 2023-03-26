const Cart = require("../models/cart.model");

const initiateCart = async (loggedUser)=>{
    // let loggedUser = loggedUser;
    try {
        let cart = await Cart.findOne({user: loggedUser}).populate({
            path: "collectibles",
            populate: {
                path: "itemData",
                populate: ["category", "postedBy"]
            }
        })

        if(cart){
            console.log(cart)
        }
        else{
            cart = {
                user: loggedUser
            }
            let newCart = new Cart(cart)
            cart = await newCart.save();
            console.log(cart)
        }
    } catch (error) {
        console.error(error.message)
    }
}

const createCart = async (req, res)=>{
    let loggedUser = req.user;
    try {
        let cart = await Cart.findOne({user: loggedUser}).populate({
            path: "collectibles",
            populate: {
                path: "itemData",
                populate: ["category", "postedBy"]
            }
        })

        if(cart){
            res.json(cart)
        }
        else{
            cart = {
                user: loggedUser
            }
            let newCart = new Cart(cart)
            cart = await newCart.save();
            res.json(cart)
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const addToCart = async (req, res)=>{
    let {collectibleId} = req.body
    const loggedUser = req.user

    try{
        let cart = await Cart.findOne({user: loggedUser._id}).populate({
            path: "collectibles",
            populate: {
                path: "itemData",
                populate: ["category", "postedBy"]
            }
        })

        let index = cart.collectibles.findIndex(item => String(item.itemData._id) === String(collectibleId))

        if(index !== -1 ){
            cart.collectibles[index].quantity += 1;
        }
        else{
            cart.collectibles.push({
                itemData: collectibleId,
                quantity: 1
            })
        }

        let cartLength = cart.collectibles.length
        console.log(cartLength)

        for (let i = 0; i < cartLength; i++){
            cart.total += cart.collectibles[i].quantity * cart.collectibles[i].itemData.price;
        }

    cart = await Cart.findByIdAndUpdate(cart._id, cart, {new: true})
    res.json(cart)
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

const deleteFromCart = async (req, res)=>{
    let {collectibleId, price} = req.body
    const loggedUser = req.user

    try{
        let cart = await Cart.findOne({user: loggedUser._id}).populate({
            path: "collectibles",
            populate: {
                path: "itemData",
                populate: ["category", "postedBy"]
            }
        })

        let index = cart.collectibles.findIndex(item => String(item.itemData._id) === String(collectibleId))

        if(index !== -1 ){
            cart.collectibles[index].quantity -= 1;
        }
        else{
            
        }

        let cartLength = cart.collectibles.length
        console.log(cartLength)

        for (let i = 0; i < cartLength; i++){
            cart.total += cart.collectibles[i].quantity * cart.collectibles[i].itemData.price;
        }

    cart = await Cart.findByIdAndUpdate(cart._id, cart, {new: true})
    res.json(cart)
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

const getAllCart = async (req, res)=>{
    const loggedUser = req.user;

    try{
        let carts = await Cart.find({user: loggedUser}).populate("collectibles").populate("collectibles.category")
        res.json(carts)
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

const clearCart = async (req, res)=>{
    const loggedUser = req.user
    try{
        let cart = {}
        cart.collectibles = []
        let carts = await Cart.findOneAndUpdate({user: loggedUser}, cart, {new: true})
        res.json(carts)
    }
    catch(err){
        res.status(400).json(err.message)
    }

}

const deleteMultiple = async (req, res)=>{
    const loggedUser = req.user
    const {collectibleId} = req.body

    try{
        
        let cart = await Cart.findOne({user: loggedUser._id}).populate({
            path: "collectibles",
            populate: {
                path: "itemData",
                populate: ["category", "postedBy"]
            }
        })

        let index = cart.collectibles.findIndex(item => String(item.itemData._id) === String(collectibleId))

        cart.collectibles.splice(index, 1)
        cart = await Cart.findByIdAndUpdate(cart._id, cart, {new: true})
        res.json(cart)
    }
    catch(err){
        res.status(400).json(err.message)
    }

}

module.exports = {
    createCart, addToCart, deleteFromCart, getAllCart, initiateCart, clearCart, deleteMultiple
}