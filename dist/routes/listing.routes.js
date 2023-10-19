"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const isSeller_1 = __importDefault(require("../middlewares/isSeller"));
const listing_controller_1 = __importDefault(require("../controllers/listing.controller"));
const validations_1 = __importDefault(require("../validations"));
const listing_validation_1 = require("../validations/listing.validation");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(isAuth_1.default, isSeller_1.default, (0, validations_1.default)(listing_validation_1.CreateListingInput), listing_controller_1.default.createListing)
    .get(listing_controller_1.default.getAllListings);
router.get("/user", isAuth_1.default, listing_controller_1.default.getUserListing);
router.get("/user/:id", listing_controller_1.default.getUserListing);
router.patch("/save/:id", isAuth_1.default, listing_controller_1.default.saveListing);
router
    .route("/:id")
    .patch(isAuth_1.default, isSeller_1.default, (0, validations_1.default)(listing_validation_1.EditListingInput), listing_controller_1.default.editListing)
    .delete(isAuth_1.default, isSeller_1.default, (0, validations_1.default)(listing_validation_1.DeleteListingInput), listing_controller_1.default.deleteListing)
    .get(listing_controller_1.default.getSingleListing);
exports.default = router;
