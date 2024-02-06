import mongoose, { Collection, Types } from "mongoose";
import { IUser } from "../interfaces/model/user.interface";
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
    cover: {
      type: String,
      default: "https://avatarfiles.alphacoders.com/865/86518.png",
    },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    websiteUrl: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    stateOfResidence: { type: String },
    city: { type: String },
    nationality: { type: String },
    sex: { type: String },
    dob: { type: String },
    phoneNumber1: { type: Number },
    phoneNumber2: { type: Number },
    pageViews: {
      value: { type: Number, default: 0 },
      users: {
        type: [{ type: Types.ObjectId, ref: Collections.user }],
        default: [],
      },
    },
    isAdmin: { type: Boolean, default: false },
    totalListing: { type: Number, default: 0 },
    savedListing: {
      type: [{ type: Types.ObjectId, ref: Collections.listing }],
      default: [],
    },
    subscribedToNewsletter: { type: Boolean, default: false },
    totalSaved: {
      value: { type: Number, default: 0 },
      users: {
        default: [],
        type: [{ type: Types.ObjectId, ref: Collections.user }],
      },
    },

    isVerified: { type: Boolean, default: false },

    balanceAmount: { type: Number },
    zipCode: { type: Number },

    // for bank
    accountNo: { type: String },
    bankName: { type: String },
    accountName: { type: String },
    userType: { type: Number, default: 0 },

    // typeof account
    accountType: { type: Number, default: 0 },
    subscribed: { type: Boolean, default: false },
    noOfSubscription: { type: Number, default: 0 },
    sellerType: { type: Number, default: 0 },

    newsLetterDate: { type: Number, default: Date.now() },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const User = mongoose.model(Collections.user, UserSchema);

export default User;
