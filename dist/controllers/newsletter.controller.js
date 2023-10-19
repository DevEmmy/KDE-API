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
const newsletter_service_1 = __importDefault(require("../services/newsletter.service"));
class NewsletterController {
    constructor() {
        this.subscribeToNewsLetter = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.newsletterService.subscribeToNewsletter(email);
                res.status(200).json({
                    message: "You have successfully subscribed to our newsletter",
                    data: null,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.unsubscribeFromNewsletter = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                yield this.newsletterService.unSubscribeFromNewsletter(email);
                res.status(200).json({
                    message: "You have successfully unscubscribed from CREAM newsletter",
                    data: null,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.newsletterService = new newsletter_service_1.default();
    }
}
const newsletterController = new NewsletterController();
exports.default = newsletterController;
