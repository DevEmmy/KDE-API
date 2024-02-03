import crypto from "crypto";
import {
  ITransfer,
  TransferDTO,
  WebhookPayload,
} from "../interfaces/model/payment.interface";
import settings from "../constants/settings";
import md5 from "md5";
import axios from "axios";
import { paygateInstance } from "../config/axios.config";
import { BadRequestError } from "./error-responses";
import Transaction from "../models/transaction.model";
import { TransactionStatus } from "../interfaces/model/transaction.interface";
import User from "../models/user.model";
import Subscription from "../models/subscription.model";
import {
  SubscriptionDuration,
  SubscriptionPrices,
  SubscriptionType,
} from "../interfaces/model/subscription.interface";

function encrypt(sharedKey: string, plainText: string) {
  const bufferedKey = Buffer.from(sharedKey, "utf16le");
  const key = crypto.createHash("md5").update(bufferedKey).digest();
  const newKey = Buffer.concat([key, key.slice(0, 8)]);
  const IV = Buffer.alloc(8, "\0");
  const cipher = crypto
    .createCipheriv("des-ede3-cbc", newKey, IV)
    .setAutoPadding(true);
  let value =
    cipher.update(plainText, "utf8", "base64") + cipher.final("base64");
  return value;
}

export async function transfer(data: TransferDTO) {
  try {
    const requestBody: ITransfer = {
      request_ref: data.request_ref,
      request_type: "transfer_funds",
      auth: {
        type: "bank.account",
        secure: encrypt(
          settings?.bank?.clientSecret as string,
          settings?.bank?.accountNumber
        ),
        auth_provider: "Fidelity",
        route_mode: null,
      },
      transaction: {
        mock_mode: "Test",
        transaction_ref: data.transaction_ref,
        transaction_desc: data.transaction_desc,
        transaction_ref_parent: null,
        amount: data.amount * 100,
        customer: {
          customer_ref: data.user?._id,
          firstname: data.user?.firstName,
          surname: data?.user?.lastName,
          email: data?.user?.email,
          mobile_no: String(data?.user?.phoneNumber1),
        },
        meta: {
          a_key: "a_meta_value_1",
          b_key: "a_meta_value_2",
        },
        details: {
          destination_account: settings?.bank?.accountNumber,
          destination_bank_code: settings?.bank?.bankCode,
          otp_override: true,
        },
      },
    };

    const signature = md5(
      `${data.request_ref};${settings?.bank?.clientSecret}`
    );

    const response = await paygateInstance.post("/transact", requestBody, {
      headers: { Signature: signature },
    });

    return response?.data;
  } catch (error: any) {
    console.log(error);
    throw new BadRequestError(error);
  }
}

export async function webhook(payload: WebhookPayload) {
  if (payload.details.status.toLowerCase() === TransactionStatus.SUCCESSFUL) {
    const transaction = await Transaction.findOneAndUpdate(
      {
        transaction_ref: payload.details.transaction_ref,
      },
      { status: TransactionStatus.SUCCESSFUL }
    );

    if (transaction?.subscriptionType) {
      const date = new Date();
      await Subscription.findOneAndUpdate(
        { userId: transaction?.userId },
        {
          type: transaction.subscriptionType,
          price: SubscriptionPrices[transaction?.subscriptionType],
          endDate:
            transaction?.subscriptionType === SubscriptionType.FREE
              ? null
              : date.setMonth(
                  date.getMonth() +
                    SubscriptionDuration[transaction?.subscriptionType]
                ),
        }
      );
    }
  } else {
    //do nothing()
  }
}
