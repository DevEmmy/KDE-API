const Report = require("../models/report.model")

const getAllReports = async (req, res)=>{
    try{
        const reports = await Report.find().populate("listing");
        res.json(reports);
    }
    catch(err)
    {
        res.json(err);
    }
    
}

module.exports = {}