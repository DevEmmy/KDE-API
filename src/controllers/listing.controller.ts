import { NextFunction, Request, Response } from "express";
import ListingService from "../services/listing.service";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import { uploadListingMedia, uploadToCloud } from "../config/uploader.config";
import { BadRequestError } from "../helpers/error-responses";
import logger from "../config/logger.config";

class ListingController {
  private readonly listingService: ListingService;

  constructor() {
    this.listingService = new ListingService();
  }

  public createListing = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    logger.info("Creating listing");
    try {
      const {
        category,
        title,
        location,
        features,
        description,
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
      } = req.body;

      const owner = req.userId;

      if (req?.body?.images?.length === 0) {
        return next(new BadRequestError("Provide at lease one image & video"));
      }

      const images = await uploadListingMedia(req?.body?.images, {});
      const videos = await uploadListingMedia(req?.body?.videos || [], {
        resource_type: "video",
        format: "mp4",
      });

      const data = await this.listingService.createListing({
        category,
        title,
        location,
        postedBy: owner,
        features,
        description,
        images,
        videos,
        price,
        attachedDocuments,
        year,
        forRent: forRent ?? false,
        noOfBathrooms,
        noOfBedrooms,
        carCondition,
        engineType,
        color,
        model,
      });

      res.status(201).json({ message: "Listing created successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public deleteListing = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    logger.info("Deleting listing ❌");

    try {
      const listingId = req.params.id;

      const user = <string>req.userId;

      await this.listingService.deleteListing(user, listingId);

      res
        .status(200)
        .json({ message: "Listing deleted successfully", data: null });
    } catch (error) {
      return next(error);
    }
  };

  public getAllListings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.info("Fetching listings");
    try {
      const page = <number>parseInt(req.query?.page as string) || 0;
      const limit = <number>parseInt(req.query?.hitsPerPage as string) || 10;

      const data = await this.listingService.getAllListings({ page, limit });

      res.status(200).json({
        message: "Listings fetched successfully",
        data: {
          listings: data.listings,
          count: data.count,
        },
      });
    } catch (error) {
      return next(error);
    }
  };

  public getSingleListing = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.info("Getting single listing");
    try {
      const listingId = req.params.id;

      const data = await this.listingService.getSingleListing(listingId);

      res.status(200).json({ message: "Listing fetched successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public getUserListing = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = <string>req.userId || req.params.id;
      const data = await this.listingService.getUserListings(userId);

      res
        .status(200)
        .json({ message: "User listings fetched successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public editListing = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    logger.info("Editing listing");
    try {
      const userId = <string>req.userId;
      const listingId = req.params.id;

      const {
        category,
        title,
        location,
        features,
        description,
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
      } = req.body;

      if (req.body.images?.length > 0) {
        req.body.images = await uploadListingMedia(req.body.images, {});
      }

      if (req?.body?.videos?.length > 0) {
        req.body.videos = await uploadListingMedia(req?.body?.videos, {
          resource_type: "video",
          format: "mp4",
        });
      }

      const data = await this.listingService.editListing(userId, {
        _id: listingId,
        category,
        title,
        location,
        features,
        description,
        images: req.body?.images,
        videos: req.body?.videos,
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

      res.status(200).json({ message: "Listing updated successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public saveListing = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const listingId = req.params.id;
      const userId = <string>req.userId;

      await this.listingService.saveListing(userId, listingId);

      res.status(200).json({ message: "success", data: null });
    } catch (error) {
      return next(error);
    }
  };
}

const listingController = new ListingController();

export default listingController;
