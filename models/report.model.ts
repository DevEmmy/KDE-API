import mongoose, { Types } from "mongoose";
import { IReport } from "../interfaces/model/report.interface";
import { Collections } from "../interfaces/collections";

const ReportSchema = new mongoose.Schema<IReport>(
  {
    message: { type: String, required: true },
    user: { type: Types.ObjectId, ref: Collections.user, required: true },
    listing: { type: Types.ObjectId, ref: Collections.listing, required: true },
  },
  { timestamps: true }
);

const Report = mongoose.model(Collections.report, ReportSchema);
export default Report;
