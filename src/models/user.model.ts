import mongoose, { Types } from "mongoose";
import { ISex, IUser } from "../interfaces/model/user.interface";
import { Collections } from "../interfaces/collections";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, trim: true, unique: true },
    otherNames: { type: String, default: "" },
    about: {
      type: String,
      default: "Hello there, I am using King David Elites.",
    },
    profilePicture: {
      type: String,
      default: "https://avatarfiles.alphacoders.com/865/86518.png",
    },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    website: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    nationality: { type: String },
    sex: { type: String, enum: [ISex.male, ISex.female] },
    dob: { type: Date },
    phoneNumber1: { type: Number },
    phoneNumber2: { type: Number },
    savedListings: [{ type: Types.ObjectId, ref: Collections.listing }],
    profileViews: { type: Number, default: 0 },
    accountNumber: { type: Number },
    accountName: { type: String },
    bankName: { type: String },
    isSeller: { type: Boolean, default: false },
    totalListings: { type: Number, default: 0 },
    totalAvailableListings: { type: Number, default: 0 },
    subscribedToNewsletter: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const User = mongoose.model(Collections.user, UserSchema);

export default User;
