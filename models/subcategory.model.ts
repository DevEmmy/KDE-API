import mongoose, { Types } from 'mongoose';
import { IListingSubCategory } from '../interfaces/model/listing.interface';
import { Collections } from '../interfaces/collections';

const SubCategorySchema = new mongoose.Schema<IListingSubCategory>(
  {
    category: { type: Types.ObjectId, ref: Collections.category, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const SubCategory = mongoose.model(Collections.subcategory, SubCategorySchema);
export default SubCategory;
