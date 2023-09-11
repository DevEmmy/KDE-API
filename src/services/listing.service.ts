import { ForbiddenError, NotFoundError } from "../helpers/error-responses";
import { IListing } from "../interfaces/model/listing.interface";
import { IUser } from "../interfaces/model/user.interface";
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

  async getAllListings(): Promise<IListing[]> {
    const listings = await Listing.find({ isAvailable: true });

    return listings;
  }

  async getUserListings(userId: string): Promise<IListing[]> {
    // fetching only listings available for sale/rent
    const listings = await Listing.find({ owner: userId, isAvailable: true });

    return listings;
  }

  async getSingleListing(listingId: string): Promise<IListing> {
    const listing = await Listing.findById(listingId).populate("owner");

    if (!listing) throw new NotFoundError("Listing does not exist");

    listing.views += 1;

    await listing.save();

    return listing;
  }

  async deleteListing(user: string, listingId: string) {
    const listing = await Listing.findOneAndDelete({
      _id: listingId,
      owner: user,
    });

    if (!listing)
      throw new ForbiddenError(
        "Listing does not exist or does not belong to you"
      );

    // decrement the total listings by 1
    await User.findByIdAndUpdate(user, {
      $inc: { totalAvailableListings: -1, totalListings: -1 },
    });
  }

  async editListing(user: string, body: Partial<IListing>): Promise<IListing> {
    const {
      _id,
      category,
      title,
      location,
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

    const listing = await Listing.findById(_id);

    if (!listing) throw new NotFoundError("Listing does not exist");

    if (listing.owner.toString() != user.toString())
      throw new ForbiddenError("This listing does not belong to you");

    listing.title = title || listing.title;
    listing.category = category || listing.category;
    listing.location = location || listing.location;
    listing.features = features || listing.features;
    listing.description = description || listing.description;
    listing.images = images || listing.images;
    listing.videos = videos || listing.videos;
    listing.price = price || listing.price;
    listing.attachedDocuments = attachedDocuments || listing.attachedDocuments;
    listing.year = year || listing.year;
    listing.offerType = offerType || listing.offerType;
    listing.noOfBedrooms = noOfBedrooms || listing.noOfBedrooms;
    listing.noOfBathrooms = noOfBathrooms || listing.noOfBathrooms;
    listing.carCondition = carCondition || listing.carCondition;
    listing.engineType = engineType || listing.engineType;
    listing.color = color || listing.color;
    listing.model = model || listing.model;

    const result = await listing.save();

    return result;
  }

  async saveListing(userId: string, listingId: string) {
    let listing = await Listing.findById(listingId);

    if (!listing) {
      throw new NotFoundError("listing does not exist");
    }

    listing = listing.toObject();

    if (listing.savedBy.includes(userId.toString())) {
      listing.savedBy = listing.savedBy.filter(
        (user) => user.toString() != userId.toString()
      );
    } else {
      listing.savedBy.push(userId);
    }

    await listing.save();
  }
}
