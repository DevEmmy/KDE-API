import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`@route:${req.url} 🔥 @method: ${req.method}`);
  next();
};

export default loggerMiddleware;
