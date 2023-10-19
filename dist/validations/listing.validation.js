"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveListingInput = exports.EditListingInput = exports.CreateListingInput = exports.DeleteListingInput = void 0;
const yup_1 = require("yup");
exports.DeleteListingInput = (0, yup_1.object)({
    params: (0, yup_1.object)({
        id: (0, yup_1.string)().required("Listing id is required"),
    }),
});
exports.CreateListingInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        category: (0, yup_1.string)().required(),
        title: (0, yup_1.string)().required(),
        location: (0, yup_1.string)().required(),
        features: (0, yup_1.array)().required(),
        description: (0, yup_1.string)().required(),
        price: (0, yup_1.number)().required(),
        attachedDocuments: (0, yup_1.array)().required(),
        year: (0, yup_1.number)().required(),
        offerType: (0, yup_1.string)().required("offerType must be sale/rent"),
        noOfBathrooms: (0, yup_1.number)().notRequired(),
        noOfBedrooms: (0, yup_1.number)().notRequired(),
        carCondition: (0, yup_1.string)().notRequired(),
        engineType: (0, yup_1.string)().notRequired(),
        color: (0, yup_1.string)().notRequired(),
        model: (0, yup_1.string)().notRequired(),
    }),
});
exports.EditListingInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        category: (0, yup_1.string)().notRequired(),
        title: (0, yup_1.string)().notRequired(),
        location: (0, yup_1.string)().notRequired(),
        features: (0, yup_1.array)().notRequired(),
        description: (0, yup_1.string)().notRequired(),
        price: (0, yup_1.number)().notRequired(),
        attachedDocuments: (0, yup_1.array)().notRequired(),
        year: (0, yup_1.number)().notRequired(),
        offerType: (0, yup_1.string)().notRequired(),
        noOfBathrooms: (0, yup_1.number)().notRequired(),
        noOfBedrooms: (0, yup_1.number)().notRequired(),
        carCondition: (0, yup_1.string)().notRequired(),
        engineType: (0, yup_1.string)().notRequired(),
        color: (0, yup_1.string)().notRequired(),
        model: (0, yup_1.string)().notRequired(),
    }),
    params: (0, yup_1.object)({
        id: (0, yup_1.string)().required(),
    }),
});
exports.SaveListingInput = (0, yup_1.object)({
    params: (0, yup_1.object)({
        id: (0, yup_1.string)().required(),
    }),
});
