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
Object.defineProperty(exports, "__esModule", { value: true });
const property_request_service_1 = require("../services/property-request.service");
class PropertyRequestController {
    constructor() {
        this.createPropertyRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, request } = req.body;
                const data = yield this.propertyRequestServices.addOne({
                    name,
                    email,
                    request,
                });
                res.status(200).json({
                    message: "You have successfully added a new property request.",
                    data,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.getAllPropertyRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.propertyRequestServices.getAll();
                res
                    .status(200)
                    .json({ message: "Successfully fetched all property request", data });
            }
            catch (error) {
                return next(error);
            }
        });
        this.getOnePropertyRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const data = yield this.propertyRequestServices.getOne(_id);
                res.status(200).json({
                    message: "You have successfully fetched this property request",
                    data,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.deleteOnePropertyRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                yield this.propertyRequestServices.delete(_id);
                res.status(200).json({
                    message: "You have successfully deleted this property request",
                    data: null,
                });
            }
            catch (error) {
                return next(error);
            }
        });
        this.propertyRequestServices = new property_request_service_1.PropertyRequestService();
    }
}
const propertyRequestController = new PropertyRequestController();
exports.default = propertyRequestController;
