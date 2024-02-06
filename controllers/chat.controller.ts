import { NextFunction, Request, Response } from "express";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import ChatService from "../services/chat.service";
import { IMessage } from "../interfaces/model/chat.interface";

class ChatController {
  private readonly chatServices: ChatService;

  constructor() {
    this.chatServices = new ChatService();
  }

  public createConversation = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const friend = req.params.id;
    const user = req.userId as string;
    try {
      const data = await this.chatServices.createConversation({
        members: [user.toString(), friend],
      });

      res.status(201).json({ data, message: "conversation created" });
    } catch (error) {
      return next(error);
    }
  };

  public getUserConversations = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.chatServices.getUserConversations(
        req.userId as string
      );

      res.status(200).json({ data, message: "conversations fetched" });
    } catch (error) {
      return next(error);
    }
  };

  public getSingleConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.chatServices.getSingleConversation(req.params.id);
      res
        .status(200)
        .json({ message: "Conversation fetched successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public sendMessage = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body as IMessage;
    const sender = req.userId as string;
    try {
      const data = await this.chatServices.sendMessage({ ...body, sender });
      res.status(201).json({ message: "message sent successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const conversationId = req.params.id;

    try {
      const data = await this.chatServices.getConversationMessages(
        conversationId
      );

      res.status(200).json({ message: "Messages fetched successfully", data });
    } catch (error) {
      return next(error);
    }
  };
}

const chatController = new ChatController();
export default chatController;
