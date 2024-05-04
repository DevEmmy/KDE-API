import { Types } from "mongoose";
import { IUser } from "./user.interface";

export enum SubscriptionType {
  FREE = "free",
  BASIC = "basic",
  PLUS = "plus",
  PREMIUM = "premium",
}

export const SubscriptionPrices = {
  [SubscriptionType.FREE]: 0,
  [SubscriptionType.BASIC]: 10000,
  [SubscriptionType.PLUS]: 50000,
  [SubscriptionType.PREMIUM]: 100000,
};

// In Months

export const SubscriptionDuration = {
  [SubscriptionType.BASIC]: 1,
  [SubscriptionType.PLUS]: 6,
  [SubscriptionType.PREMIUM]: 12,
};

export interface ISubscription {
  userId: string | Types.ObjectId | IUser;
  price: number;
  endDate: Date;
  type: SubscriptionType;
}
