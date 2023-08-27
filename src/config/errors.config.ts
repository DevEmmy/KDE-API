import { Request, Response, NextFunction } from "express";

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
  if (error instanceof CustomError) {
    return res.status(error.code).json({ error });
  }
  res.status(500).json({ error });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Requested route does not exist" });
};
