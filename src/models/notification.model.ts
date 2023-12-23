import mongoose, { Types } from "mongoose";
import { INotification } from "../interfaces/model/notification.interface";
import { Collections } from "../interfaces/collections";

const NotificationSchema = new mongoose.Schema<INotification>(
  {
    title: { type: String },
    sender: { type: Types.ObjectId, ref: Collections.user },
    message: { type: String },
    type: { type: Number },
    link: { type: String },
    read: { type: Boolean, default: false },
    receiver: { type: Types.ObjectId, ref: Collections.user },
  },
  { timestamps: true }
);

const Notification = mongoose.model(
  Collections.notification,
  NotificationSchema
);

export default Notification;
