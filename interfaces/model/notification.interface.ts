import { ObjectId } from "mongoose";
import { IUser } from "./user.interface";

export interface INotification {
  title: string;
  sender: string | ObjectId | IUser;
  message: string;
  type: number;
  link: string;
  read: boolean;
  receiver: string | ObjectId | IUser;
}
