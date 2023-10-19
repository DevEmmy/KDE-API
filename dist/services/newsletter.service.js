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
const newsletter_subscription_model_1 = __importDefault(require("../models/newsletter.subscription.model"));
/**
 * Note: Whenever sending newsletter, attach the user email to the button for unsubscribing
 */
class NewsletterService {
    constructor() { }
    subscribeToNewsletter(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionExist = yield newsletter_subscription_model_1.default.findOne({ email });
            if (subscriptionExist) {
                throw new error_responses_1.ForbiddenError("You are already suscribed to CREAM newsletter");
            }
            else {
                yield newsletter_subscription_model_1.default.create({ email });
            }
        });
    }
    unSubscribeFromNewsletter(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionExist = yield newsletter_subscription_model_1.default.findOne({ email });
            if (!subscriptionExist) {
                throw new error_responses_1.ForbiddenError("You are not suscribed to CREAM newsletter");
            }
            yield subscriptionExist.deleteOne();
        });
    }
}
exports.default = NewsletterService;
