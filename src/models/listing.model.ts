import mongoose, { Types } from "mongoose";
import {
  ICarConditions,
  IListing,
  IListingType,
} from "../interfaces/model/listing.interface";
import { Collections } from "../interfaces/collections";

const ListingSchema = new mongoose.Schema<IListing>(
  {
    category: {
      type: Types.ObjectId,
      ref: Collections.category,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: Collections.user,
      required: true,
    },
    features: {
      type: [{ type: String }],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [{ type: String }],
      required: true,
    },
    videos: {
      type: [{ type: String }],
      required: true,
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

    price: {
      type: Number,
      required: true,
    },

    attachedDocuments: {
      type: [{ type: String }],
      default: [],
    },

    year: { type: Number, required: true },
    offerType: {
      type: String,
      enum: [IListingType.rent, IListingType.sale],
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    savedBy: {
      type: [{ type: String, ref: Collections.user }],
      default: [],
    },
    noOfBathrooms: { type: Number },
    noOfBedrooms: { type: Number },
    rentedBy: { type: Types.ObjectId, ref: Collections.user },
    carCondition: {
      typr: String,
      enum: [ICarConditions.new, ICarConditions.used],
    },
    engineType: { type: String },
    color: { type: String },
    model: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Listing = mongoose.model(Collections.listing, ListingSchema);
export default Listing;
