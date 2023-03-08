const User = require("../models/users.model")
const Member = require("../models/members.model")

const getMembers = async (req, res)=>{
    Member.find()
    .then(resp => res.json(resp))
    .catch(error => res.json({message: "An Error Occured", error: error}))
}

const addAMember = async (req, res)=>{
    const user = req.user;
    const member = req.body;
    member.whatsapp = "https://wa.me/" + member.whatsapp
    if(user.isAdmin){
        await new Member.save(member)
        .then(resp => res.json(resp))
        .catch(error => res.json({message: "An Error Occured", error: error}))
    }
}

const deleteMember = async (req, res)=>{
    if(req.user.isAdmin){
        await Member.findByIdAndDelete(req.params.id)
        .then(resp => res.json(resp))
        .catch(error => res.json({message: "An Error Occured", error: error}))
    }
}

module.exports = {getMembers, addAMember, deleteMember}