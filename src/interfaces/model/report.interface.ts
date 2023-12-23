import { Types } from "mongoose";
import { IListing } from "./listing.interface";

export interface IReport {
  message: string;
  listing: string | Types.ObjectId | IListing;
  user: string | Types.ObjectId | IListing;
}
