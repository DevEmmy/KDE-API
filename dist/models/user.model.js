"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_interface_1 = require("../interfaces/model/user.interface");
const collections_1 = require("../interfaces/collections");
const UserSchema = new mongoose_1.default.Schema({
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
    sex: { type: String, enum: [user_interface_1.ISex.male, user_interface_1.ISex.female] },
    dob: { type: Date },
    phoneNumber1: { type: Number },
    phoneNumber2: { type: Number },
    profileViews: { type: Number, default: 0 },
    accountNumber: { type: Number },
    accountName: { type: String },
    bankName: { type: String },
    isSeller: { type: Boolean, default: false },
    totalListings: { type: Number, default: 0 },
    totalAvailableListings: { type: Number, default: 0 },
    subscribedToNewsletter: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
const User = mongoose_1.default.model(collections_1.Collections.user, UserSchema);
exports.default = User;
