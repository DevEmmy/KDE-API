import multer from "multer";
import { UploadApiOptions, v2 } from "cloudinary";
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
      let fileName: any = file.originalname;
      // add a uuid before the extension

      fileName = fileName.split(".");

      fileName[fileName.length - 2] = fileName[fileName.length - 2] + v4();

      fileName = fileName.join(".");

      cb(null, `${fileName}`);
    },
  }),

  fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    const acceptedExtensions = ["jpg", "png", "webp", "gif"];

    if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const uploadToCloud = async (
  file: Express.Multer.File,
  options?: UploadApiOptions
): Promise<string> => {
  try {
    let newPath: string;

    // we ahve to return a new path because sharp does not replace the same image parsed as input
    if (file.mimetype.includes("image")) {
      console.log("file.mimetype");
      newPath = await imageService.compressImage(file.path);
    } else {
      newPath = file.path;
    }

    const media = await cloudinary.uploader.upload(newPath, {
      folder: "CREAM MEDIA",
      ...options,
    });

    await fs.unlink(file.path, () => {
      logger.info(`File- ${file.path} deleted`);
    });

    await fs.unlink(newPath, () => {});

    return media.url;
  } catch (error: any) {
    throw new BadRequestError(error);
  }
};
