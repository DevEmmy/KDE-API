const Verification = require("../models/verification.model");

const getVerificationStatus =  async (req, res)=>{
    const {id} = req.params;
    let response = await Verification.findOne({user: req.user})
    if(response){
        res.json({status: response.status})
    }
    else{
        res.json({status: null})
    }   
}

module.exports = {getVerificationStatus}