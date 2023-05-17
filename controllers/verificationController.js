const Verification = require("../models/verification.model");

const getVerificationStatus =  async (req, res)=>{
    const {id} = req.params;
    let response = await Verification.find({user: req.user})
    res.json(response.status)
}

module.exports = {getVerificationStatus}