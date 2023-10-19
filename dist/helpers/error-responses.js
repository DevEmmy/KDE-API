"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.InternalServerError = exports.ForbiddenError = exports.BadRequestError = exports.NotFoundError = void 0;
const errors_config_1 = require("../config/errors.config");
class NotFoundError extends errors_config_1.CustomError {
    constructor(message) {
        super(404, message);
        this.message = message;
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends errors_config_1.CustomError {
    constructor(message) {
        super(400, message);
        this.message = message;
        this.name = "BadRequestError";
    }
}
exports.BadRequestError = BadRequestError;
class ForbiddenError extends errors_config_1.CustomError {
    constructor(message) {
        super(403, message);
        this.message = message;
        this.name = "ForbiddenError";
    }
}
exports.ForbiddenError = ForbiddenError;
class InternalServerError extends errors_config_1.CustomError {
    constructor(message) {
        super(500, message);
        this.message = message;
        this.name = "InternalServerError";
    }
}
exports.InternalServerError = InternalServerError;
class UnauthorizedError extends errors_config_1.CustomError {
    constructor(message) {
        super(401, message);
        this.message = message;
        this.name = "UnauthorizedError";
    }
}
exports.UnauthorizedError = UnauthorizedError;
