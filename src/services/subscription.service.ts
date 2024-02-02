import { v4 } from "uuid";
import { SubscribeDTO } from "../interfaces/dto/subscription.dto";
import {
  SubscriptionPrices,
  SubscriptionType,
} from "../interfaces/model/subscription.interface";
import md5 from "md5";
import settings from "../constants/settings";
import Transaction from "../models/transaction.model";
import {
  TransactionGateway,
  TransactionPurpose,
} from "../interfaces/model/transaction.interface";
import { transfer } from "../helpers/payment";
import User from "../models/user.model";
import { IUser } from "../interfaces/model/user.interface";

export default class SubscriptionService {
  public async subscribe(data: SubscribeDTO) {
    const transaction_ref = v4();
    const request_ref = v4();

    const user = await User.findOne({ _id: data.userId });

    await Transaction.create({
      transaction_ref,
      request_ref,
      purpose: TransactionPurpose.SUBSCRIPTION,
      amount: SubscriptionPrices[data.type],
      userId: data.userId,
      gateway: TransactionGateway.TRANSFER,
      description: `Subscription for ${data.type} tier`,
      subscriptionType: data.type,
    });

    await transfer({
      user: user as IUser,
      transaction_desc: `Subscription for ${data.type} tier`,
      transaction_ref,
      request_ref,
      amount: SubscriptionPrices[data.type],
    });
  }
}
