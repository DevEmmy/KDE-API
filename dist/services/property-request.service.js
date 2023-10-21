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
exports.PropertyRequestService = void 0;
const mailer_config_1 = __importDefault(require("../config/mailer.config"));
const mails_1 = require("../constants/mails");
const error_responses_1 = require("../helpers/error-responses");
const property_request_model_1 = __importDefault(require("../models/property-request.model"));
class PropertyRequestService {
    constructor() { }
    addOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { request, name, email } = body;
            const propertyRequest = yield property_request_model_1.default.create({
                request,
                name,
                email,
            });
            yield (0, mailer_config_1.default)({
                to: email,
                subject: "Property Request",
                html: mails_1.sendPropertyRequestHTML,
            });
            return propertyRequest;
        });
    }
    getOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield property_request_model_1.default.findById(_id);
            if (!request)
                throw new error_responses_1.NotFoundError("Request does not exist");
            return request;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield property_request_model_1.default.find({}).populate("createdAt");
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield property_request_model_1.default.findById(_id);
            if (!request)
                throw new error_responses_1.NotFoundError("Request does not exist");
            yield request.deleteOne();
        });
    }
}
exports.PropertyRequestService = PropertyRequestService;
