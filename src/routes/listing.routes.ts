import { Router } from "express";
import { fileUploader } from "../config/uploader.config";
import isAuth from "../middlewares/isAuth";
import isSeller from "../middlewares/isSeller";
import listingController from "../controllers/listing.controller";

const router = Router();

router
  .route("/")
  .post(
    isAuth,
    isSeller,
    fileUploader.array("media"),
    listingController.createListing
  );

export default router;
