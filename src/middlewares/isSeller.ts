import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import User from "../models/user.model";
import { ForbiddenError } from "../helpers/error-responses";

const isSeller = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);

    if (!user?.isSeller) {
      throw new ForbiddenError(
        "You have to become a seller to perform this action"
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};

export default isSeller;
