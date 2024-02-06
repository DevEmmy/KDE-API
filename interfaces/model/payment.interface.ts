import { TransactionStatus } from "./transaction.interface";
import { IUser } from "./user.interface";

export interface ITransfer {
  request_ref: string;
  request_type: "transfer_funds";
  auth: {
    type: "bank.account";
    secure: string;
    auth_provider: "Fidelity";
    route_mode: null;
  };
  transaction: {
    mock_mode: string;
    transaction_ref: string;
    transaction_desc: string;
    transaction_ref_parent: null;
    amount: number;
    customer: {
      customer_ref: string;
      firstname: string;
      surname: string;
      email: string;
      mobile_no: string;
    };
    meta: {
      a_key: string;
      b_key: string;
    };
    details: {
      destination_account: string;
      destination_bank_code: string;
      otp_override: boolean;
    };
  };
}

export interface TransferDTO {
  user: IUser;
  transaction_ref: string;
  request_ref: string;
  transaction_desc: string;
  amount: number;
}

export interface WebhookPayload {
  details: {
    data: {
      amount: number;
    };
    transaction_desc: string;
    transaction_ref: string;
    transaction_type: string;
    status: TransactionStatus;
    customer_email: string;
  };
}
