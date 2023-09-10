import { ForbiddenError, NotFoundError } from "../helpers/error-responses";
import { IListing } from "../interfaces/model/listing.interface";
import Listing from "../models/listing.model";
import User from "../models/user.model";
import CategoryService from "./category.service";

export default class ListingService {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  async createListing(body: Partial<IListing>): Promise<IListing> {
    let {
      category,
      title,
      location,
      owner,
      features,
      description,
      images,
      videos,
      price,
      attachedDocuments,
      year,
      offerType,
      noOfBathrooms,
      noOfBedrooms,
      carCondition,
      engineType,
      color,
      model,
    } = body;

    category = await this.categoryService.getCategoryById(category as string);

    if (!category) throw new NotFoundError("Category does not exist");

    const user = await User.findByIdAndUpdate(owner);

    if (!user) throw new NotFoundError("User does not exist");

    const listing = await Listing.create({
      title,
      category: category._id,
      location,
      owner,
      features,
      description,
      images,
      videos,
      price,
      attachedDocuments,
      year,
      offerType,
      noOfBathrooms,
      noOfBedrooms,
      carCondition,
      engineType,
      color,
      model,
    });

    user.totalListings += 1;
    user.totalAvailableListings += 1;

    await user.save();

    return listing;
  }

  async getAllListings() {}

  async getUserListings(userId: string): Promise<IListing[]> {
    // fetching only listings available for sale/rent
    const listings = await Listing.find({ owner: userId, isAvailable: true });

    return listings;
  }

  async getSingleListing() {}
}
