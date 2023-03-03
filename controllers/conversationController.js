const ConversationModel = require("../models/conversation.model")

const getUserConversations = async (req, res)=>{
    const loggedUser = req.user
    await ConversationModel.find()
    .then(resp => {
        resp = resp.filter(i => i.members.includes(loggedUser._id))
        res.json(resp)
    })
    .catch(err => res.json(err))
}

const createNewConversation = async (req, res)=>{
    const loggedUser = req.user;
    console.log(loggedUser)
    const toChatId = req.params.id;
    const convo = ConversationModel.findOne({members: [loggedUser._id, toChatId]})

    await convo.then(resp => {
        if(!resp){
            const newConvo = new ConversationModel({
                    members: [loggedUser._id, toChatId]
                })
            
                newConvo.save()
                .then(resp => res.json(resp))
                .catch(err => res.json(err)) 
                }
        else{
            res.json(resp)
        }
    })
    .catch(err => res.json(err))
}

const getConversationById = async (req, res)=>{
    await ConversationModel.findById(req.params.id)
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}


module.exports = {getUserConversations, createNewConversation, getConversationById}