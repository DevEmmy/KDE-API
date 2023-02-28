const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema(

    {
        members: { type: Array },
    },
    {
        timestamps: true
    }
)

const ConversationModel = mongoose.model("ConversationModel", conversationSchema)

module.exports = ConversationModel;
