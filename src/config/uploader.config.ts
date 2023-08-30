import multer from "multer";
import { v2 } from "cloudinary";
import settings from "../constants/settings";
import { BadRequestError } from "../helpers/error-responses";
import { Request } from "express";
import path from "path";
import { v4 } from "uuid";
import imageService from "../helpers/image.helper";
import fs from "fs";
import logger from "./logger.config";

const cloudinary = v2;

cloudinary.config({
  api_key: settings.cloudinary.apiKey,
  api_secret: settings.cloudinary.apiSecret,
  cloud_name: settings.cloudinary.name,
});

type MulterStorageCallback = (error: Error | null, destination: string) => void;

export const fileUploader = multer({
  storage: multer.diskStorage({
    destination(
      req: Request,
      file: Express.Multer.File,
      cb: MulterStorageCallback
    ) {
      cb(null, path.join(__dirname, "../images"));
    },

    filename(
      req: Request,
      file: Express.Multer.File,
      cb: MulterStorageCallback
    ) {
      cb(null, `${file.originalname}-${v4()}`);
    },
  }),

  fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    const acceptedExtensions = ["jpg", "png", "webp", "gif"];

    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const uploadToCloud = async (filePath: string): Promise<string> => {
  try {
    // we ahve to return a new path because sharp does not replace the same image parsed as input
    const newPath = await imageService.compressImage(filePath);

    const image = await cloudinary.uploader.upload(newPath, {
      folder: "CREAM IMAGES",
    });

    await fs.unlink(filePath, () => {
      logger.info(`File- ${filePath} deleted`);
    });

    await fs.unlink(newPath, () => {});

    return image.url;
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};
