"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_interface_1 = require("../interfaces/model/user.interface");
const uuid_1 = require("uuid");
const collections_1 = require("../interfaces/collections");
const FIFTEEN_MINUTES = 60 * 15;
const TokenSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    token: { type: String, default: (0, uuid_1.v4)() },
    type: {
        type: String,
        required: true,
        enum: [
            user_interface_1.ITokenTypes.accountVerificationToken,
            user_interface_1.ITokenTypes.passwordResetToken,
        ],
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: FIFTEEN_MINUTES,
    },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
const Token = mongoose_1.default.model(collections_1.Collections.token, TokenSchema);
exports.default = Token;
