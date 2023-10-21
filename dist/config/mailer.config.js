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
const nodemailer_1 = __importDefault(require("nodemailer"));
const settings_1 = __importDefault(require("../constants/settings"));
const error_responses_1 = require("../helpers/error-responses");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: settings_1.default.nodemailer.email,
        pass: settings_1.default.nodemailer.password,
    },
});
const sendMail = (mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail(Object.assign({ from: settings_1.default.nodemailer.email }, mailOptions));
    }
    catch (error) {
        throw new error_responses_1.InternalServerError(error);
    }
});
exports.default = sendMail;
