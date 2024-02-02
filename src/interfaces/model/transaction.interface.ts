import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { SubscriptionType } from "./subscription.interface";

export enum TransactionPurpose {
  SUBSCRIPTION = "subscription",
  LISTING = "listing",
}

export enum TransactionGateway {
  TRANSFER = "transfer",
}

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESSFUL = "successful",
  FAILED = "failed",
}

export interface ITransaction {
  transaction_ref: string;
  request_ref: string;
  purpose: TransactionPurpose;
  amount: number;
  userId: string | Types.ObjectId | IUser;
  gateway: TransactionGateway;
  description: string;
  subscriptionType?: SubscriptionType;
  status: TransactionStatus;
}
