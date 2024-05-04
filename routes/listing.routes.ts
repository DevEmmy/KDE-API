import { Router } from "express";
import { fileUploader } from "../config/uploader.config";
import isAuth from "../middlewares/isAuth";
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
  .post(isAuth, validate(CreateListingInput), listingController.createListing)
  .get(listingController.getAllListings);

router.get("/user", isAuth, listingController.getUserListing);
router.get("/user/:id", listingController.getUserListing);
router.patch("/save/:id", isAuth, listingController.saveListing);

router
  .route("/:id")
  .patch(
    isAuth,

    validate(EditListingInput),
    listingController.editListing
  )
  .delete(isAuth, validate(DeleteListingInput), listingController.deleteListing)
  .get(listingController.getSingleListing);

export default router;
