import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import User from "../models/user.model";
import { ForbiddenError, UnauthorizedError } from "../helpers/error-responses";

const isAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      const error = new UnauthorizedError(
        "You need admin access to access this route"
      );
      return next(error);
    }

    next();
  } catch (error) {
    return next(error);
  }
};

export default isAdmin;
