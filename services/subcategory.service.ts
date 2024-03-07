import { IListingSubCategory } from '../interfaces/model/listing.interface';
import SubCategory from '../models/subcategory.model';

export default class SubCategoryService {
  public async createSubcategory(data: Partial<IListingSubCategory>) {
    const subcategory = await SubCategory.create(data);

    return subcategory;
  }

  public async getSubcategory(category: string) {
    const subcategory = await SubCategory.find({ category });

    return subcategory;
  }

  public async getSingleSubcategory(id: string) {
    const subcategory = await SubCategory.findOne({ _id: id });

    return subcategory;
  }

  public async deleteSubcategory(id: string) {
    await SubCategory.findOneAndDelete({ _id: id });
  }
}
