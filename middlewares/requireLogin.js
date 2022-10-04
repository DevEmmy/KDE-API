const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET
const User = require('../models/users.model')


module.exports = (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "You must Be authorized"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, jwt_secret, (err, payload)=>{
        if(err){
            return res.status(401).json({error: "you must be logged in"})
        }
        const {_id} = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })
        
    })
}