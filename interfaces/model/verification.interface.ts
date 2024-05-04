import { Types } from "mongoose";
import { IUser } from "./user.interface";

enum IVerificationStatus {
  PENDING = "PENDING",
}

export interface IVerification {
  user: string | Types.ObjectId | IUser;
  verificationType: number;
  verificationId?: Types.ObjectId;
  verifiedProfilePicture: string;
  nationality: string;
  status: string;
}
