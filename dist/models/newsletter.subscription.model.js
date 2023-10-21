"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const collections_1 = require("../interfaces/collections");
const NewsletterSubscriptionSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
const NewsletterSubscription = mongoose_1.default.model(collections_1.Collections.newsletter_subscription, NewsletterSubscriptionSchema);
exports.default = NewsletterSubscription;
