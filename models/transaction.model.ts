import mongoose, { Types } from "mongoose";
import {
  ITransaction,
  TransactionGateway,
  TransactionPurpose,
  TransactionStatus,
} from "../interfaces/model/transaction.interface";
import { Collections } from "../interfaces/collections";
import { SubscriptionType } from "../interfaces/model/subscription.interface";

const TransactionSchema = new mongoose.Schema<ITransaction>({
  transaction_ref: { type: String, required: true },
  request_ref: { type: String, required: true },
  purpose: { type: String, enum: Object.values(TransactionPurpose) },
  amount: { type: Number, required: true },
  userId: { type: Types.ObjectId, ref: Collections.user, required: true },
  gateway: { type: String, enum: Object.values(TransactionGateway) },
  description: { type: String, default: "A random transaction" },
  subscriptionType: {
    type: String,
    enum: Object.values(SubscriptionType),
    default: null,
  },
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.PENDING,
  },
});

const Transaction = mongoose.model(Collections.transaction, TransactionSchema);
export default Transaction;
