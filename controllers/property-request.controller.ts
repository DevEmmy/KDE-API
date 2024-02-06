import { NextFunction, Request, Response } from "express";
import { PropertyRequestService } from "../services/property-request.service";
import { IPropertyRequest } from "../interfaces/model/property-requests.model";

class PropertyRequestController {
  private readonly propertyRequestServices: PropertyRequestService;

  constructor() {
    this.propertyRequestServices = new PropertyRequestService();
  }

  public createPropertyRequest = async (
    req: Request<{}, {}, Omit<IPropertyRequest, "_id">>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, request } = req.body;

      const data = await this.propertyRequestServices.addOne({
        name,
        email,
        request,
      });

      res.status(200).json({
        message: "You have successfully added a new property request.",
        data,
      });
    } catch (error) {
      return next(error);
    }
  };

  public getAllPropertyRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.propertyRequestServices.getAll();

      res
        .status(200)
        .json({ message: "Successfully fetched all property request", data });
    } catch (error) {
      return next(error);
    }
  };

  public getOnePropertyRequest = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const _id = req.params.id;

      const data = await this.propertyRequestServices.getOne(_id);

      res.status(200).json({
        message: "You have successfully fetched this property request",
        data,
      });
    } catch (error) {
      return next(error);
    }
  };

  public deleteOnePropertyRequest = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const _id = req.params.id;

      await this.propertyRequestServices.delete(_id);

      res.status(200).json({
        message: "You have successfully deleted this property request",
        data: null,
      });
    } catch (error) {
      return next(error);
    }
  };
}

const propertyRequestController = new PropertyRequestController();

export default propertyRequestController;
