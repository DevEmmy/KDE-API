import { Router } from "express";
import { fileUploader } from "../config/uploader.config";
import isAuth from "../middlewares/isAuth";
import isSeller from "../middlewares/isSeller";
import listingController from "../controllers/listing.controller";
import validate from "../validations";
import {
  CreateListingInput,
  DeleteListingInput,
  EditListingInput,
} from "../validations/listing.validation";

const router = Router();

router
  .route("/")
  .post(
    isAuth,
    isSeller,
    fileUploader.array("media"),
    validate(CreateListingInput),
    listingController.createListing
  )
  .get(listingController.getAllListings);

router.get("/user", isAuth, listingController.getUserListing);
router.get("/user/:id", listingController.getUserListing);
router.patch("/save/:id", isAuth, listingController.saveListing);

router
  .route("/:id")
  .patch(
    isAuth,
    isSeller,
    fileUploader.array("media"),
    validate(EditListingInput),
    listingController.editListing
  )
  .delete(
    isAuth,
    isSeller,
    validate(DeleteListingInput),
    listingController.deleteListing
  )
  .get(listingController.getSingleListing);

export default router;
