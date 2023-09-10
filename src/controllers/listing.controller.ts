import { NextFunction, Response } from "express";
import ListingService from "../services/listing.service";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import { uploadToCloud } from "../config/uploader.config";
import { BadRequestError } from "../helpers/error-responses";

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
}

const listingController = new ListingController();

export default listingController;
