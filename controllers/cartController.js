const Cart = require("../models/cart.model");

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
        let cart = await Cart.findOne({user: loggedUser._id})

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

    try {
        let cart = await Cart.findOne({user: loggedUser._id})
        let index = cart.collectibles.indexOf(collectibleId)
        cart.total -= price
        cart.collectibles.splice(index, 1)
        cart = await Cart.findByIdAndUpdate(cart._id, cart, {new: true}).populate("collectibles").populate("collectibles.category")
        res.json(cart)
    } catch (error) {
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

module.exports = {
    createCart, addToCart, deleteFromCart, getAllCart
}