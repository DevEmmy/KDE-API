"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validations_1 = __importDefault(require("../validations"));
const property_request_validation_1 = require("../validations/property-request.validation");
const property_request_controller_1 = __importDefault(require("../controllers/property-request.controller"));
const router = (0, express_1.Router)();
router
    .route("/")
    .post((0, validations_1.default)(property_request_validation_1.CreatePropertyRequestInput), property_request_controller_1.default.createPropertyRequest)
    .get(property_request_controller_1.default.getAllPropertyRequest);
router
    .route("/:id")
    .get(property_request_controller_1.default.getOnePropertyRequest)
    .delete(property_request_controller_1.default.deleteOnePropertyRequest);
exports.default = router;
