const ConversationModel = require("../models/conversation.model")
const { getUserByIdFnc } = require("./usersControllers")

const getUserConversations = async (req, res)=>{
    const loggedUser = req.user
    await ConversationModel.find()
    .then(async resp => {
        resp = resp.filter(i => i.members.includes(loggedUser._id))
        for (let i = 0; i < resp.members.length; i++) {
            resp.members[i] = await getUserByIdFnc(resp.members[i])
        }
        res.json(resp)
    })
    .catch(err => res.json(err))
}

const createNewConversation = async (req, res)=>{
    const loggedUser = req.user;
    console.log(loggedUser)
    const toChatId = req.params.id;
    const convo = await ConversationModel.findOne({members: [loggedUser._id, toChatId]})

    if(!convo){
        const newConvo = new ConversationModel({
            members: [loggedUser._id, toChatId]
                })
            
            newConvo.save()
                .then(async resp =>{
                    for (let i = 0; i < resp.members.length; i++) {
                        resp.members[i] = await getUserByIdFnc(resp.members[i])
                    }
                    res.json(resp)
                })
                .catch(err => res.json(err)) 
    }
        else{
            res.json(convo)
        }
    
}

const getConversationById = async (req, res)=>{
    await ConversationModel.findById(req.params.id)
    .then(async resp =>{
        for (let i = 0; i < resp.members.length; i++) {
            resp.members[i] = await getUserByIdFnc(resp.members[i])
        }
        res.json(resp)
    })
    .catch(err => res.json(err))
}


module.exports = {getUserConversations, createNewConversation, getConversationById}