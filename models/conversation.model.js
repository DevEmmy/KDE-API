const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema(

    {
        members: { type: Array },
        timestamp: {type: String, default: Date.now()},
        lastMessage: {type: String, default:"You can now chat!"}
    },
    {
        timestamps: true
    }
)

const ConversationModel = mongoose.model("ConversationModel", conversationSchema)

module.exports = ConversationModel;
