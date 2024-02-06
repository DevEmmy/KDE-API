import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import validate from "../validations";
import reportControllers from "../controllers/report.controllers";
import { CreateReportInput } from "../validations/report.validation";

const router = Router();

router.post(
  "/listing/:id",
  isAuth,
  validate(CreateReportInput),
  reportControllers.createReport
);
router.get("/", reportControllers.getReports);

export default router;
