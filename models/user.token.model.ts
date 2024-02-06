import mongoose, { mongo } from "mongoose";
import { IToken, ITokenTypes } from "../interfaces/model/user.interface";
import { v4 } from "uuid";
import { Collections } from "../interfaces/collections";

const FIFTEEN_MINUTES = 60 * 15;

const TokenSchema = new mongoose.Schema<IToken>(
  {
    email: { type: String, required: true },
    token: { type: String, default: v4() },
    type: {
      type: String,
      required: true,
      enum: [
        ITokenTypes.accountVerificationToken,
        ITokenTypes.passwordResetToken,
      ],
    },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: FIFTEEN_MINUTES,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

const Token = mongoose.model(Collections.token, TokenSchema);

export default Token;
