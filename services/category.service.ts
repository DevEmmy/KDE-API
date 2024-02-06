import { BadRequestError, NotFoundError } from "../helpers/error-responses";
import slugify from "../helpers/slugify";
import { IListingCategory } from "../interfaces/model/listing.interface";
import Category from "../models/category.model";

export default class CategoryService {
  constructor() {}

  async addCategory(
    body: Partial<IListingCategory>
  ): Promise<IListingCategory> {
    const { title } = body;

    const slug = slugify(title as string);

    let category = await Category.findOne({ slug });

    if (!category) {
      category = await Category.create({ title, slug });
    }

    return category;
  }

  async editCategory(
    body: Partial<IListingCategory>
  ): Promise<IListingCategory> {
    const { _id, title } = body;

    const slug = slugify(title as string);

    const category = await Category.findByIdAndUpdate(
      _id,
      { title, slug },
      { new: true }
    );

    if (!category) throw new NotFoundError("Category does not exist");

    return category;
  }

  async deleteCategory(id: string) {
    const category = await Category.findByIdAndDelete(id);

    if (!category) throw new NotFoundError("Category does not exist");
  }

  async getCategoryById(id: string): Promise<IListingCategory> {
    const category = await Category.findById(id);

    if (!category) throw new NotFoundError("Category does not exist");

    return category;
  }

  async getAllCategories(): Promise<IListingCategory[]> {
    const categories = await Category.find({});

    return categories;
  }
}
