import { CustomError } from "../config/errors.config";

export class NotFoundError extends CustomError {
  message: string;

  constructor(message: string) {
    super(404, message);
    this.message = message;
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends CustomError {
  message: string;

  constructor(message: string) {
    super(400, message);
    this.message = message;
    this.name = "BadRequestError";
  }
}
export class ForbiddenError extends CustomError {
  message: string;

  constructor(message: string) {
    super(403, message);
    this.message = message;
    this.name = "ForbiddenError";
  }
}
export class InternalServerError extends CustomError {
  message: string;

  constructor(message: string) {
    super(500, message);
    this.message = message;
    this.name = "InternalServerError";
  }
}
export class UnauthorizedError extends CustomError {
  message: string;

  constructor(message: string) {
    super(404, message);
    this.message = message;
    this.name = "UnauthorizedError";
  }
}
