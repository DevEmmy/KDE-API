import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { IListingCategory } from "./listing.interface";

export interface IArticle {
  _id: string;
  title: string;
  slug: string;
  body: string;
  cover: string;
  author: string | IUser | Types.ObjectId;
  category: string | IListingCategory | Types.ObjectId;
}
