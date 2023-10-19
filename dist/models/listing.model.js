"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const listing_interface_1 = require("../interfaces/model/listing.interface");
const collections_1 = require("../interfaces/collections");
const ListingSchema = new mongoose_1.default.Schema({
    category: {
        type: mongoose_1.Types.ObjectId,
        ref: collections_1.Collections.category,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.Types.ObjectId,
        ref: collections_1.Collections.user,
        required: true,
    },
    features: {
        type: [{ type: String }],
        default: [],
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [{ type: String }],
        required: true,
    },
    videos: {
        type: [{ type: String }],
        required: true,
        default: [],
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        required: true,
    },
    attachedDocuments: {
        type: [{ type: String }],
        default: [],
    },
    year: { type: Number, required: true },
    offerType: {
        type: String,
        enum: [listing_interface_1.IListingType.rent, listing_interface_1.IListingType.sale],
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    savedBy: {
        type: [{ type: String, ref: collections_1.Collections.user }],
        default: [],
    },
    noOfBathrooms: { type: Number },
    noOfBedrooms: { type: Number },
    rentedBy: { type: mongoose_1.Types.ObjectId, ref: collections_1.Collections.user },
    carCondition: {
        type: String,
        enum: [listing_interface_1.ICarConditions.new, listing_interface_1.ICarConditions.used],
    },
    engineType: { type: String },
    color: { type: String },
    model: { type: String },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
const Listing = mongoose_1.default.model(collections_1.Collections.listing, ListingSchema);
exports.default = Listing;
