import { NextFunction, Request, Response } from "express";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import { UnauthorizedError } from "../helpers/error-responses";
import JWTHelper from "../helpers/Jwt.helper";
import { UserService } from "../services/user.service";

const isAuth = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers["authorization"];

    if (!headers || !headers.startsWith("Bearer ")) {
      return next(
        new UnauthorizedError("Provide token header as Bearer ${token}")
      );
    }

    const token = headers.split(" ")[1];

    if (!token) {
      return next(new UnauthorizedError("Provide token"));
    }

    const userAuth = await JWTHelper.verifyAccessToken<{ id: string }>(token);

    if (!userAuth) {
      return next(new UnauthorizedError("Token is invalid or has expired"));
    }

    const userService = new UserService();

    const user = await userService.getUserByAuthId(userAuth.id);

    req.userId = user._id;

    next();
  } catch (error) {
    return next(error);
  }
};

export default isAuth;
