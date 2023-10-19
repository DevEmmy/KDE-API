"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settings_1 = __importDefault(require("../constants/settings"));
const logger_config_1 = __importDefault(require("./logger.config"));
const startServer = (app) => {
    mongoose_1.default
        .connect(settings_1.default.mongo.url)
        .then(() => {
        app.listen(settings_1.default.port, () => {
            logger_config_1.default.info(`Server is listening on port ${settings_1.default.port}`);
        });
    })
        .catch((error) => {
        logger_config_1.default.error(`Unable to connect to mongoose server, ${error.toString()}`);
        process.exit(1);
    });
};
exports.default = startServer;
