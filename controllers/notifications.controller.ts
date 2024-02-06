import { NextFunction, Request, Response } from "express";
import NotificationService from "../services/notification.service";
import { INotification } from "../interfaces/model/notification.interface";
import { IRequest } from "../interfaces/CustomExpressHandlers";

class NotificationControllers {
  private readonly notificationServices: NotificationService;
  constructor() {
    this.notificationServices = new NotificationService();
  }

  public sendNotification = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notification: Partial<INotification> = req.body;
      notification.sender = req.userId;
      const data = await this.notificationServices.saveNotification(
        notification
      );
      res.status(201).json({ message: "notification sent", data });
    } catch (error) {
      return next(error);
    }
  };

  public getUserNotifications = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = <string>req.userId;
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      const data = await this.notificationServices.getUserNotifications(
        userId,
        {
          page,
          limit,
        }
      );

      res.status(200).json({ message: "notifications fetched", data });
    } catch (error) {
      return next(error);
    }
  };

  public readNotifications = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = await this.notificationServices.readNotification(id);
      res.status(200).json({ message: "notification read", data });
    } catch (error) {
      return next(error);
    }
  };

  public getUnreadNotifications = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.notificationServices.getUnreadNotifications(
        req.userId as string
      );
      res.status(200).json({ message: "fetched notifications", data });
    } catch (error) {
      return next(error);
    }
  };
}

const notificationControllers = new NotificationControllers();

export default notificationControllers;
