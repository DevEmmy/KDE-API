import mongoose, { Collection } from "mongoose";
import { INewsletterSubscription } from "../interfaces/model/newsletter.interface";
import { Collections } from "../interfaces/collections";

const NewsletterSubscriptionSchema =
  new mongoose.Schema<INewsletterSubscription>(
    {
      email: {
        type: String,
        unique: true,
        required: true,
      },
    },
    {
      timestamps: true,
      toObject: { virtuals: true },
      toJSON: { virtuals: true },
    }
  );

const NewsletterSubscription = mongoose.model(
  Collections.newsletterSubscription,
  NewsletterSubscriptionSchema
);

export default NewsletterSubscription;
