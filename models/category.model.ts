import mongoose from "mongoose";
import { IListingCategory } from "../interfaces/model/listing.interface";
import { Collections } from "../interfaces/collections";

const CategorySchema = new mongoose.Schema<IListingCategory>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model(Collections.category, CategorySchema);

export default Category;
