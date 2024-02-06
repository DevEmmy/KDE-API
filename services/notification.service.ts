import paginate, { PaginationDTO } from "../helpers/pagination";
import { INotification } from "../interfaces/model/notification.interface";
import Notification from "../models/notification.model";

export default class NotificationService {
  constructor() {}

  public saveNotification = async (notification: Partial<INotification>) => {
    return await Notification.create(notification);
  };

  public getUserNotifications = async (
    userId: string,
    paginationData: Partial<PaginationDTO>
  ) => {
    const notifications = Notification.find({ receiver: userId }).sort({
      createdAt: -1,
    });

    const total = await Notification.find({
      receiver: userId,
    }).countDocuments();

    return await paginate({
      model: notifications,
      total,
      page: paginationData.page,
      limit: paginationData.limit,
    });
  };

  public readNotification = async (id: string) => {
    return await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
  };

  public getUnreadNotifications = async (userId: string) => {
    return await Notification.find({ receiver: userId, read: false });
  };
}
