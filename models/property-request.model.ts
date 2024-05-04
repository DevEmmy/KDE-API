import mongoose from "mongoose";
import { IPropertyRequest } from "../interfaces/model/property-requests.model";
import { Collections } from "../interfaces/collections";

const PropertyRequestSchema = new mongoose.Schema<IPropertyRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    request: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const PropertyRequest = mongoose.model(
  Collections.property_request,
  PropertyRequestSchema
);

export default PropertyRequest;
