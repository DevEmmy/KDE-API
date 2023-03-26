const Report = require("../models/report.model")

const getAllReports = async (req, res)=>{
    try{
        const reports = await Report.find().populate("listing").populate("user");
        res.json(reports);
    }
    catch(err)
    {
        res.status(400).json(err);
    }
    
}

const postReport = async (req, res)=>{
    const report = req.body;
    try{
        let response = new Report(report)
        await response.save()
        res.json("Successfully created report")
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

module.exports = {
    getAllReports, postReport
}