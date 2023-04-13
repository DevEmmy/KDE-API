const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema(

    {
        members: { type: Array },
        timestamp: {type: Date, default: new Date()},
        lastMessage: {type: String, default:"You can now chat!"}
    },
    {
        timestamps: true
    }
)

const ConversationModel = mongoose.model("ConversationModel", conversationSchema)

module.exports = ConversationModel;
