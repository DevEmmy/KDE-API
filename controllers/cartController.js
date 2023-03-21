const Cart = require("../models/cart.model");

const createCart = async (req, res)=>{
    let loggedUser = req.user;
    try {
        let cart = await Cart.findOne({user: loggedUser});
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
    
}

module.exports = {
    createCart
}