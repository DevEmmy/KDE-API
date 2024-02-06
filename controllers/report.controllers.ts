import { NextFunction, Request, Response } from "express";
import ReportService from "../services/report.service";
import { IReport } from "../interfaces/model/report.interface";
import { IRequest } from "../interfaces/CustomExpressHandlers";

class ReportController {
  private readonly reportServices: ReportService;

  constructor() {
    this.reportServices = new ReportService();
  }

  async createReport(req: IRequest, res: Response, next: NextFunction) {
    const user = req.userId as string;
    const listing = req.params.id;
    const message = req.body.message;
    try {
      const data = await this.reportServices.createReport({
        user,
        listing,
        message,
      });
      res.status(201).json({ message: "Report created", data });
    } catch (error) {
      return next(error);
    }
  }

  async getReports(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.reportServices.getAllReports();

      res.status(200).json({ message: "Reports fetched successfullly", data });
    } catch (error) {
      return next(error);
    }
  }
}

const reportControllers = new ReportController();
export default reportControllers;
