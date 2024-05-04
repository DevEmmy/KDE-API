import mongoose, { Types } from 'mongoose';
import { ICarConditions, IListing, IListingType } from '../interfaces/model/listing.interface';
import { Collections } from '../interfaces/collections';

const ListingSchema = new mongoose.Schema<IListing>(
  {
    category: {
      type: Types.ObjectId,
      ref: Collections.category,
      required: true,
    },
    subcategory: {
      type: Types.ObjectId,
      ref: Collections.subcategory,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postedBy: {
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
    available: {
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
    forRent: {
      type: Boolean,
      required: false,
    },
    views: {
      type: [
        {
          type: Types.ObjectId,
          ref: Collections.user,
        },
      ],
      default: [],
    },
    thoseWhoSaved: {
      type: [{ type: Types.ObjectId, ref: Collections.user }],
      default: [],
    },
    noOfBathrooms: { type: Number },
    noOfBedrooms: { type: Number },
    rentedBy: { type: Types.ObjectId, ref: Collections.user, default: null },
    carCondition: {
      type: String,
      enum: [ICarConditions.new, ICarConditions.used, ICarConditions.empty],
      default: ICarConditions.empty,
    },
    engineType: { type: String },
    color: { type: String },
    model: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Listing = mongoose.model(Collections.listing, ListingSchema);
export default Listing;
