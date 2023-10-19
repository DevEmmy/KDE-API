"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validations_1 = __importDefault(require("../validations"));
const newsletter_validation_1 = require("../validations/newsletter.validation");
const newsletter_controller_1 = __importDefault(require("../controllers/newsletter.controller"));
const router = (0, express_1.Router)();
router.post("/subscription", (0, validations_1.default)(newsletter_validation_1.SubscribeToNewsletterInput), newsletter_controller_1.default.subscribeToNewsLetter);
router.delete("/subscription/:email", (0, validations_1.default)(newsletter_validation_1.UnSubscribeFromNewsletterInput), newsletter_controller_1.default.unsubscribeFromNewsletter);
exports.default = router;
