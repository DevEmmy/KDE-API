import mongoose, { Schema } from "mongoose";
import { IVerification } from "../interfaces/model/verification.interface";
import { Collections } from "../interfaces/collections";

const VerificationSchema = new Schema<IVerification>({
  user: { type: Schema.Types.ObjectId, ref: Collections.user, required: true },
  verificationType: { type: Number },
  verificationId: { type: Object, default: null },
  verifiedProfilePicture: { type: String, default: null },
  nationality: String,
  status: { type: String, default: "PENDING" },
});

const Verification = mongoose.model(
  Collections.verification,
  VerificationSchema
);
export default Verification;
