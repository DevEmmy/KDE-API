import mongoose, { Types } from "mongoose";
import {
  ISubscription,
  SubscriptionType,
} from "../interfaces/model/subscription.interface";
import { Collections } from "../interfaces/collections";

export const SubscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    type: {
      type: String,
      enum: Object.values(SubscriptionType),
      default: SubscriptionType.FREE,
    },
    price: { type: Number, default: 0 },
    userId: { type: Types.ObjectId, ref: Collections.user, required: true },
    endDate: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model(
  Collections.subscription,
  SubscriptionSchema
);

export default Subscription;
