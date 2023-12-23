import mongoose, { Types } from "mongoose";
import { IConversation } from "../interfaces/model/chat.interface";
import { Collections } from "../interfaces/collections";

const ConversationSchema = new mongoose.Schema<IConversation>(
  {
    members: { type: [{ type: Types.ObjectId, ref: Collections.user }] },
    timestamp: { type: Date, default: Date.now() },
    lastMessage: { type: String, default: "You can now chat!" },
  },
  { timestamps: true }
);

const Conversation = mongoose.model(
  Collections.conversation,
  ConversationSchema
);
export default Conversation;
