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
const error_responses_1 = require("../helpers/error-responses");
const listing_model_1 = __importDefault(require("../models/listing.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const category_service_1 = __importDefault(require("./category.service"));
class ListingService {
    constructor() {
        this.categoryService = new category_service_1.default();
    }
    createListing(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { category, title, location, owner, features, description, images, videos, price, attachedDocuments, year, offerType, noOfBathrooms, noOfBedrooms, carCondition, engineType, color, model, } = body;
            category = yield this.categoryService.getCategoryById(category);
            if (!category)
                throw new error_responses_1.NotFoundError("Category does not exist");
            const user = yield user_model_1.default.findByIdAndUpdate(owner);
            if (!user)
                throw new error_responses_1.NotFoundError("User does not exist");
            const listing = yield listing_model_1.default.create({
                title,
                category: category._id,
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
            user.totalListings += 1;
            user.totalAvailableListings += 1;
            yield user.save();
            return listing;
        });
    }
    getAllListings() {
        return __awaiter(this, void 0, void 0, function* () {
            const listings = yield listing_model_1.default.find({ isAvailable: true });
            return listings;
        });
    }
    getUserListings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // fetching only listings available for sale/rent
            const listings = yield listing_model_1.default.find({ owner: userId, isAvailable: true });
            return listings;
        });
    }
    getSingleListing(listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const listing = yield listing_model_1.default.findById(listingId).populate("owner");
            if (!listing)
                throw new error_responses_1.NotFoundError("Listing does not exist");
            listing.views += 1;
            yield listing.save();
            return listing;
        });
    }
    deleteListing(user, listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const listing = yield listing_model_1.default.findOneAndDelete({
                _id: listingId,
                owner: user,
            });
            if (!listing)
                throw new error_responses_1.ForbiddenError("Listing does not exist or does not belong to you");
            // decrement the total listings by 1
            yield user_model_1.default.findByIdAndUpdate(user, {
                $inc: { totalAvailableListings: -1, totalListings: -1 },
            });
        });
    }
    editListing(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, category, title, location, features, description, images, videos, price, attachedDocuments, year, offerType, noOfBathrooms, noOfBedrooms, carCondition, engineType, color, model, } = body;
            const listing = yield listing_model_1.default.findById(_id);
            if (!listing)
                throw new error_responses_1.NotFoundError("Listing does not exist");
            if (listing.owner.toString() != user.toString())
                throw new error_responses_1.ForbiddenError("This listing does not belong to you");
            listing.title = title || listing.title;
            listing.category = category || listing.category;
            listing.location = location || listing.location;
            listing.features = features || listing.features;
            listing.description = description || listing.description;
            listing.images = images || listing.images;
            listing.videos = videos || listing.videos;
            listing.price = price || listing.price;
            listing.attachedDocuments = attachedDocuments || listing.attachedDocuments;
            listing.year = year || listing.year;
            listing.offerType = offerType || listing.offerType;
            listing.noOfBedrooms = noOfBedrooms || listing.noOfBedrooms;
            listing.noOfBathrooms = noOfBathrooms || listing.noOfBathrooms;
            listing.carCondition = carCondition || listing.carCondition;
            listing.engineType = engineType || listing.engineType;
            listing.color = color || listing.color;
            listing.model = model || listing.model;
            const result = yield listing.save();
            return result;
        });
    }
    saveListing(userId, listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            let listing = yield listing_model_1.default.findById(listingId);
            if (!listing) {
                throw new error_responses_1.NotFoundError("listing does not exist");
            }
            if (listing.savedBy.includes(userId.toString())) {
                listing.savedBy = listing.savedBy.filter((user) => user.toString() != userId.toString());
            }
            else {
                listing.savedBy.push(userId);
            }
            yield listing.save();
        });
    }
}
exports.default = ListingService;
