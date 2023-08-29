import mongoose from "mongoose";
import { IUserAuth } from "../interfaces/model/user.interface";
import { Collections } from "../interfaces/collections";
import argon from "argon2";

const AuthSchema = new mongoose.Schema<IUserAuth>(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

AuthSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    this.password = await argon.hash(this.password);
  }
  return;
});

AuthSchema.methods.verifyPassword = async function (
  password: string
): Promise<boolean> {
  const isPasswordMatch = await argon.verify(this.password, password);

  return isPasswordMatch;
};

const Auth = mongoose.model(Collections.auth, AuthSchema);

export default Auth;
