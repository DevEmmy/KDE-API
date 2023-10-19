"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadListingMedia = exports.uploadToCloud = exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const settings_1 = __importDefault(require("../constants/settings"));
const error_responses_1 = require("../helpers/error-responses");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const logger_config_1 = __importDefault(require("./logger.config"));
const cloudinary = cloudinary_1.v2;
cloudinary.config({
    api_key: settings_1.default.cloudinary.apiKey,
    api_secret: settings_1.default.cloudinary.apiSecret,
    cloud_name: settings_1.default.cloudinary.name,
});
exports.fileUploader = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, path_1.default.join(__dirname, "../images"));
        },
        filename(req, file, cb) {
            let fileName = file.originalname;
            // add a uuid before the extension
            fileName = fileName.split(".");
            fileName[fileName.length - 2] = fileName[fileName.length - 2] + (0, uuid_1.v4)();
            fileName = fileName.join(".");
            cb(null, `${fileName}`);
        },
    }),
    fileFilter(req, file, cb) {
        const acceptedExtensions = ["jpg", "png", "webp", "gif"];
        if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
});
const uploadToCloud = (file, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield cloudinary.uploader.upload(file.path, Object.assign({ folder: "CREAM MEDIA" }, options));
        yield fs_1.default.unlink(file.path, () => {
            logger_config_1.default.info(`File- ${file.path} deleted`);
        });
        return media.url;
    }
    catch (error) {
        throw new error_responses_1.BadRequestError(error);
    }
});
exports.uploadToCloud = uploadToCloud;
const uploadListingMedia = (media, option) => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    const ims = [];
    while (i < media.length) {
        if (media[i].base64) {
            yield cloudinary.uploader
                .upload(media[i].base64, option)
                .then((resp) => {
                ims.push(resp.secure_url);
                console.log("done");
            })
                .catch((err) => console.log("err"));
        }
        else {
            ims.push(media[i]);
        }
        i++;
    }
    return ims;
});
exports.uploadListingMedia = uploadListingMedia;
