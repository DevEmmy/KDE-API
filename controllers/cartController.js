const Cart = require("../models/cart.model");

const createCart = async (req, res)=>{
    let loggedUser = req.user;
    try {
        let cart = await Cart.findOne({user: loggedUser}).populate("collectibles");
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
    let {collectibleId, price} = req.body
    const loggedUser = req.user

    try{
        let cart = await Cart.findOne({user: loggedUser._id})
    cart.collectibles.push(collectibleId)
    cart.total += price
    cart = await Cart.findByIdAndUpdate(cart._id, cart, {new: true}).populate("collectibles")
    res.json(cart)
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

const deleteFromCart = async (req, res)=>{
    let {collectibleId, price} = req.body
    const loggedUser = req.user

    try {
        let cart = await Cart.findOne({user: loggedUser._id})
        let index = cart.collectibles.indexOf(collectibleId)
        cart.total -= price
        cart.collectibles.splice(index, 1)
        cart = await Cart.findByIdAndUpdate(cart._id, cart, {new: true}).populate("collectibles")
        res.json(cart)
    } catch (error) {
        res.status(400).json(err.message)
    }
}

const getAllCart = async (req, res)=>{
    const loggedUser = req.user;

    try{
        let carts = await Cart.find({user: loggedUser}).populate("collectibles").populate("categories").populate("collectibles.categories")
        res.json(carts)
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

module.exports = {
    createCart, addToCart, deleteFromCart, getAllCart
}