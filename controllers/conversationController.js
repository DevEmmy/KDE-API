const ConversationModel = require("../models/conversation.model")
const User = require("../models/users.model")
const { getUserByIdFnc } = require("./usersControllers")

const getUserConversations = async (req, res)=>{
    const loggedUser = req.user
    await ConversationModel.find()
    .then( async resp => {
        resp = resp.filter(i => i.members.includes(loggedUser._id))
        
        for(let j=0; j < resp.length; j++) {
            for (let i = 0; i < 2; i++) {
            console.log(i)
            let user = await User.findById(resp[j].members[i])
            resp[j].members[i] = user   
        }
        }
            console.log(resp)
            res.json(resp)    
        })
    .catch(err => res.json(err))
}

const createNewConversation = async (req, res)=>{
    const loggedUser = req.user;
    console.log(loggedUser)
    const toChatId = req.params.id;
    const convo = await ConversationModel.findOne({ $or: [{members: [String(loggedUser._id), String(toChatId)]}, {members: [String(toChatId), String(loggedUser._id)]}]})

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
            for (let i = 0; i < convo.members.length; i++) {
                convo.members[i] = await getUserByIdFnc(convo.members[i])
            }
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