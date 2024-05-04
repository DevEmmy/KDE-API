import { Router } from "express";
import validate from "../validations";
import { CreatePropertyRequestInput } from "../validations/property-request.validation";
import propertyRequestController from "../controllers/property-request.controller";

const router = Router();

router
  .route("/")
  .post(
    validate(CreatePropertyRequestInput),
    propertyRequestController.createPropertyRequest
  )
  .get(propertyRequestController.getAllPropertyRequest);

router
  .route("/:id")
  .get(propertyRequestController.getOnePropertyRequest)
  .delete(propertyRequestController.deleteOnePropertyRequest);

export default router;
