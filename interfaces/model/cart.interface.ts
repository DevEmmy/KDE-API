import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { IListing } from "./listing.interface";

export interface ICart {
  user: string | Types.ObjectId | IUser;
  collectibles: Array<{
    itemData: string | Types.ObjectId | IListing;
    quantity: number;
  }>;
}
