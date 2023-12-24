import { ForbiddenError, NotFoundError } from "../helpers/error-responses";
import {
  IListing,
  IListingCategory,
} from "../interfaces/model/listing.interface";
import { IUser } from "../interfaces/model/user.interface";
import Listing from "../models/listing.model";
import User from "../models/user.model";
import CategoryService from "./category.service";
import NotificationService from "./notification.service";

export default class ListingService {
  private readonly categoryService: CategoryService;
  private readonly notificationService: NotificationService;

  constructor() {
    this.categoryService = new CategoryService();
    this.notificationService = new NotificationService();
  }

  async createListing(body: Partial<IListing>): Promise<IListing> {
    let {
      category,
      title,
      location,
      postedBy,
      features,
      description,
      images,
      videos,
      price,
      attachedDocuments,
      year,
      forRent,
      noOfBathrooms,
      noOfBedrooms,
      carCondition,
      engineType,
      color,
      model,
    } = body;

    category = await this.categoryService.getCategoryById(category as string);

    if (!category) throw new NotFoundError("Category does not exist");

    const user = await User.findByIdAndUpdate(postedBy);

    if (!user) throw new NotFoundError("User does not exist");

    const listing = await Listing.create({
      title,
      category: category._id,
      location,
      postedBy,
      features,
      description,
      images,
      videos,
      price,
      attachedDocuments,
      year,
      forRent,
      noOfBathrooms,
      noOfBedrooms,
      carCondition,
      engineType,
      color,
      model,
    });

    user.totalListing += 1;

    await user.save();

    return listing;
  }

  async getAllListings(data: {
    page: number;
    limit: number;
  }): Promise<{ listings: IListing[]; count: number }> {
    const count = await Listing.find({ available: true }).countDocuments();
    const listings = await Listing.find({ available: true })
      .skip(data.page * data.limit)
      .limit(data.limit);

    return { listings, count };
  }

  async getUserListings(userId: string): Promise<IListing[]> {
    // fetching only listings available for sale/rent
    const listings = await Listing.find({
      postedBy: userId,
      available: true,
    });

    return listings;
  }

  async getSingleListing(listingId: string): Promise<IListing> {
    const listing = await Listing.findById(listingId).populate("owner");

    if (!listing) throw new NotFoundError("Listing does not exist");

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
      $inc: { totalListing: -1 },
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
      forRent,
      images,
      videos,
      price,
      attachedDocuments,
      year,
      noOfBathrooms,
      noOfBedrooms,
      carCondition,
      engineType,
      color,
      model,
    } = body;

    const listing = await Listing.findById(_id);

    if (!listing) throw new NotFoundError("Listing does not exist");

    if (listing.postedBy?.toString() != user?.toString())
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
    listing.forRent = forRent || listing.forRent;
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
    let listing = await Listing.findById(listingId).populate("category");
    const user = await User.findById(userId);

    if (!user) throw new NotFoundError("user does not exist");

    if (!listing) {
      throw new NotFoundError("listing does not exist");
    }

    if (listing.thoseWhoSaved.includes(userId.toString())) {
      listing.thoseWhoSaved = listing.thoseWhoSaved.filter(
        (user) => user.toString() != userId.toString()
      );
    } else {
      listing.thoseWhoSaved.push(userId);

      let notification = {
        sender: user,
        title: "Your Listing was saved",
        message: `${
          user?.firstName + " " + user?.lastName
        } saved your listing, ${listing.title}`,
        type: 1,
        link: `/${(listing.category as IListingCategory).slug}/${listing._id}`,
        receiver: user._id,
      };

      await this.notificationService.saveNotification(notification);
    }

    await listing.save();
  }
}
