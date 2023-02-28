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
    const newMessage = new MessageModel(content)
    await newMessage.save()
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
}


module.exports = {getMessages, sendMessage}