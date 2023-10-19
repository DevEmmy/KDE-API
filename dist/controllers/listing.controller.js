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
const listing_service_1 = __importDefault(require("../services/listing.service"));
const uploader_config_1 = require("../config/uploader.config");
const error_responses_1 = require("../helpers/error-responses");
const logger_config_1 = __importDefault(require("../config/logger.config"));
class ListingController {
    constructor() {
        this.createListing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            logger_config_1.default.info("Creating listing");
            try {
                const { category, title, location, features, description, price, attachedDocuments, year, offerType, noOfBathrooms, noOfBedrooms, carCondition, engineType, color, model, } = req.body;
                const owner = req.userId;
                if (((_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                    return next(new error_responses_1.BadRequestError("Provide at lease one image & video"));
                }
                const images = yield (0, uploader_config_1.uploadListingMedia)((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.images, {});
                const videos = yield (0, uploader_config_1.uploadListingMedia)(((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.videos) || [], {
                    resource_type: "video",
                    format: "mp4",
                });
                const data = yield this.listingService.createListing({
                    category,
                    title,
                    location,
                    owner,
                    features,
                    description,
                    images,
                    videos,
                    price,
                    attachedDocuments,
                    year,
                    offerType,
                    noOfBathrooms,
                    noOfBedrooms,
                    carCondition,
                    engineType,
                    color,
                    model,
                });
                res.status(201).json({ message: "Listing created successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.deleteListing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            logger_config_1.default.info("Deleting listing ❌");
            try {
                const listingId = req.params.id;
                const user = req.userId;
                yield this.listingService.deleteListing(user, listingId);
                res
                    .status(200)
                    .json({ message: "Listing deleted successfully", data: null });
            }
            catch (error) {
                return next(error);
            }
        });
        this.getAllListings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            logger_config_1.default.info("Fetching listings");
            try {
                const data = yield this.listingService.getAllListings();
                res.status(200).json({ message: "Listings fetched successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.getSingleListing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            logger_config_1.default.info("Getting single listing");
            try {
                const listingId = req.params.id;
                const data = yield this.listingService.getSingleListing(listingId);
                res.status(200).json({ message: "Listing fetched successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.getUserListing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId || req.params.id;
                const data = yield this.listingService.getUserListings(userId);
                res
                    .status(200)
                    .json({ message: "User listings fetched successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.editListing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _e, _f, _g, _h, _j, _k;
            logger_config_1.default.info("Editing listing");
            try {
                const userId = req.userId;
                const listingId = req.params.id;
                const { category, title, location, features, description, price, attachedDocuments, year, offerType, noOfBathrooms, noOfBedrooms, carCondition, engineType, color, model, } = req.body;
                if (((_e = req.body.images) === null || _e === void 0 ? void 0 : _e.length) > 0) {
                    req.body.images = yield (0, uploader_config_1.uploadListingMedia)(req.body.images, {});
                }
                if (((_g = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.videos) === null || _g === void 0 ? void 0 : _g.length) > 0) {
                    req.body.videos = yield (0, uploader_config_1.uploadListingMedia)((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.videos, {
                        resource_type: "video",
                        format: "mp4",
                    });
                }
                const data = yield this.listingService.editListing(userId, {
                    _id: listingId,
                    category,
                    title,
                    location,
                    features,
                    description,
                    images: (_j = req.body) === null || _j === void 0 ? void 0 : _j.images,
                    videos: (_k = req.body) === null || _k === void 0 ? void 0 : _k.videos,
                    price,
                    attachedDocuments,
                    year,
                    offerType,
                    noOfBathrooms,
                    noOfBedrooms,
                    carCondition,
                    engineType,
                    color,
                    model,
                });
                res.status(200).json({ message: "Listing updated successfully", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.saveListing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const listingId = req.params.id;
                const userId = req.userId;
                yield this.listingService.saveListing(userId, listingId);
                res.status(200).json({ message: "success", data: null });
            }
            catch (error) {
                return next(error);
            }
        });
        this.listingService = new listing_service_1.default();
    }
}
const listingController = new ListingController();
exports.default = listingController;
