const Luxury = require("../models/luxury.model")

const applyLuxuryServices = async (req, res)=>{

}

const createLuxuryService = async (luxury)=>{
    const newLuxury = await new Luxury(luxury).save()
    return newLuxury
}

module.exports = {
    createLuxuryService
}