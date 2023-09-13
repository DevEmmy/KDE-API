import { NextFunction, Request, Response } from "express";
import ListingService from "../services/listing.service";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import { uploadToCloud } from "../config/uploader.config";
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
        offerType,
        noOfBathrooms,
        noOfBedrooms,
        carCondition,
        engineType,
        color,
        model,
      } = req.body;

      const owner = req.userId;

      req.files = [...((req.files || []) as Express.Multer.File[])];

      const imagesUpload = req.files?.filter((file) =>
        file.mimetype.includes("image")
      );
      const videosUpload = req.files?.filter((file) =>
        file.mimetype.includes("video")
      );

      if (imagesUpload.length === 0 || videosUpload.length === 0) {
        return next(new BadRequestError("Provide at lease one image & video"));
      }

      let images: string[] = [];
      let videos: string[] = [];

      for (const image of imagesUpload) {
        const url = await uploadToCloud(image);

        images.push(url);
      }

      for (const video of videosUpload) {
        const url = await uploadToCloud(video, {
          format: "mp4",
          resource_type: "video",
        });

        videos.push(url);
      }

      const data = await this.listingService.createListing({
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
      const data = await this.listingService.getAllListings();

      res.status(200).json({ message: "Listings fetched successfully", data });
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
        offerType,
        noOfBathrooms,
        noOfBedrooms,
        carCondition,
        engineType,
        color,
        model,
      } = req.body;

      // set them to undefined first instead of empty array so an empty array  won't be added to the DB

      let images: string[] | undefined;
      let videos: string[] | undefined;

      if ((req.files?.length as number) > 0) {
        req.files = [...((req.files || []) as Express.Multer.File[])];

        const imagesUpload = req.files?.filter((file) =>
          file.mimetype.includes("image")
        );
        const videosUpload = req.files?.filter((file) =>
          file.mimetype.includes("video")
        );

        //  initialize the arrays
        if (imagesUpload.length > 0) {
          images = [];

          for (const image of imagesUpload) {
            const url = await uploadToCloud(image);

            images.push(url);
          }
        }

        if (videosUpload.length > 0) {
          videos = [];

          for (const video of videosUpload) {
            const url = await uploadToCloud(video, {
              format: "mp4",
              resource_type: "video",
            });

            videos.push(url);
          }
        }
      }

      const data = await this.listingService.editListing(userId, {
        _id: listingId,
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
