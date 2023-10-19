"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = exports.CustomError = void 0;
const logger_config_1 = __importDefault(require("./logger.config"));
class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
    }
}
exports.CustomError = CustomError;
const errorHandler = (error, req, res, next) => {
    logger_config_1.default.error(error);
    if (error === null || error === void 0 ? void 0 : error.code) {
        return res
            .status(error === null || error === void 0 ? void 0 : error.code)
            .json({ error: error.message });
    }
    res.status(500).json({ error: error.message || error });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    res.status(404).json({ error: "Requested route does not exist" });
};
exports.notFound = notFound;
