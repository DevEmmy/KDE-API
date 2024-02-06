import { NotFoundError } from "../helpers/error-responses";
import { IConversation, IMessage } from "../interfaces/model/chat.interface";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

export default class ChatService {
  constructor() {}

  async getUserConversations(userId: string): Promise<IConversation[]> {
    return await Conversation.find({ members: userId }).populate("members");
  }

  async getSingleConversation(id: string): Promise<IConversation> {
    const conversation = await Conversation.findById(id).populate("members");
    if (!conversation) throw new NotFoundError("conversation does not exist");
    return conversation;
  }

  async createConversation(
    data: Pick<IConversation, "members">
  ): Promise<IConversation> {
    let conversation = await Conversation.findOne(data).populate("members");
    if (!conversation) {
      conversation = await Conversation.create(data);
      conversation = await conversation.populate("members");
    }

    return conversation;
  }

  async getConversationMessages(conversationId: string): Promise<IMessage[]> {
    return await Message.find({ conversationId }).populate("sender");
  }

  async sendMessage(body: Omit<IMessage, "readBy">): Promise<IMessage> {
    const message = await Message.create({
      messageContent: body.messageContent,
      sender: body.sender,
      conversationId: body.conversationId,
    });

    await Conversation.findByIdAndUpdate(
      body.conversationId,
      {
        timestamp: body.timestamp ?? Date.now(),
        lastMessage: body.messageContent,
      },
      { new: true }
    );

    return message;
  }
}
