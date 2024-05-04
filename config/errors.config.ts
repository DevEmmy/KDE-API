import { Request, Response, NextFunction } from "express";
import logger from "./logger.config";

export class CustomError extends Error {
  code: number;
  message: string;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export const errorHandler = (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error);

  if ((error as CustomError)?.code) {
    return res
      .status((error as CustomError)?.code)
      .json({ error: error.message });
  }
  res.status(500).json({ error: error.message || error });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Requested route does not exist" });
};
