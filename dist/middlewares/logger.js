"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_config_1 = __importDefault(require("../config/logger.config"));
const loggerMiddleware = (req, res, next) => {
    logger_config_1.default.info(`@route:${req.url} 🔥 @method: ${req.method}`);
    next();
};
exports.default = loggerMiddleware;
