import { NextFunction, Request, Response } from "express";
import SubscriptionService from "../services/subscription.service";
import { IRequest } from "../interfaces/CustomExpressHandlers";

class SubscriptionController {
  private readonly subscriptionService: SubscriptionService;
  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  public subscribe = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.subscriptionService.subscribe({
        userId: <string>req.userId,
        type: req.body.type,
      });

      res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  };
}

const subscriptionController = new SubscriptionController();

export default subscriptionController;
