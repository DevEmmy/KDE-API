import { Types } from "mongoose";
import { IUser } from "./user.interface";

export interface IConversation {
  members: Array<string | Types.ObjectId | IUser>;
  lastMessage: string;
  timestamp: Date;
}

export interface IMessage {
  conversationId: string | Types.ObjectId | IConversation;
  sender: string | Types.ObjectId | IUser;
  messageContent: string;
  readBy: Array<IUser | string | Types.ObjectId>;
  timestamp: Date;
}
