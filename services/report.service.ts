import { IReport } from "../interfaces/model/report.interface";
import Report from "../models/report.model";

export default class ReportService {
  constructor() {}

  async createReport(body: IReport): Promise<IReport> {
    return await Report.create(body);
  }

  async getAllReports(): Promise<IReport[]> {
    return await Report.find({}).populate("listing").populate("user");
  }
}
