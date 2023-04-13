const ConversationModel = require("../models/conversation.model")
const MessageModel = require("../models/messages.model")

const getMessages = async (req, res)=>{
    const conversationId = req.params.conversationId
    await MessageModel.find({conversationId}).populate("sender")
    .then(resp => {
        res.json(resp)
    })
    .catch(err => res.json(err))
}

const sendMessage = async (req, res)=>{
    const content = req.body;
    content.sender = req.user._id
    try{
        let conversation = {}
    conversation.timestamp = content.timestamp || Date.now();
    conversation.lastMessage = content.messageContent;
    conversation = await ConversationModel.findByIdAndUpdate(content.conversationId, conversation, {new: true})
    
    const newMessage = new MessageModel(content)
    await newMessage.save()
    res.json(conversation)
    }
    catch(err){
        res.json(err.message)
    }
    
}


module.exports = {getMessages, sendMessage}