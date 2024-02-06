import mongoose, { Types } from "mongoose";
import { IMessage } from "../interfaces/model/chat.interface";
import { Collections } from "../interfaces/collections";

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    conversationId: {
      type: Types.ObjectId,
      ref: Collections.conversation,
      required: true,
    },
    sender: { type: Types.ObjectId, ref: Collections.user, required: true },
    messageContent: { type: String, required: true },
    readBy: {
      type: [{ type: Types.ObjectId, ref: Collections.user }],
      default: [],
    },
    timestamp: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Message = mongoose.model(Collections.message, MessageSchema);
export default Message;
