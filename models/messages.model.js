const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        conversationId: { type: Schema.Types.ObjectId, ref: "ConversationModel", required:true },
        sender :{ type: Schema.Types.ObjectId, ref:'User', required: true},
        messageContent: { type: String},
        readBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    },
    {
        timestamps: true
    }
)

const MessageModel = mongoose.model("MessageModel", messageSchema)

module.exports = MessageModel;