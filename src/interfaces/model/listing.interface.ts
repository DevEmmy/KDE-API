import { Types } from "mongoose";
import { IUser } from "./user.interface";

/**
 * Let the property have an owner
 * when someone else buys it, he/she becomes the owner
 * have a tenant attribute
 */

export enum IListingType {
  sale = "sale",
  rent = "rent",
}

export enum ICarConditions {
  new = "new",
  used = "used",
}

export interface IListing {
  _id: string;
  category: Types.ObjectId | string | IListingCategory;
  title: string;
  location: string;
  owner: string | Types.ObjectId | IUser;
  features: string[];
  description: string;
  images: string[];
  videos: string[];
  isAvailable: boolean;
  price: number;
  attachedDocuments: string[];
  year: number;
  offerType: IListingType;
  views: number;
  savedBy: string[]; // the string contains ref of users that saved the property
  noOfBedrooms: number;
  noOfBathrooms: number;
  rentedBy: string | Types.ObjectId | IUser;

  //   for automobiles
  carCondition: ICarConditions;
  engineType: string;
  color: string;
  model: string;
}

export interface IListingCategory {
  _id: string;
  title: string;
  slug: string;
}
