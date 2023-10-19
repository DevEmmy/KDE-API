"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfileInput = exports.EditUserInput = void 0;
const yup_1 = require("yup");
exports.EditUserInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        firstName: (0, yup_1.string)().notRequired(),
        lastName: (0, yup_1.string)().notRequired(),
        otherNames: (0, yup_1.string)().notRequired(),
        about: (0, yup_1.string)().notRequired(),
        website: (0, yup_1.string)().notRequired(),
        facebookUrl: (0, yup_1.string)().notRequired(),
        instagramUrl: (0, yup_1.string)().notRequired(),
        address: (0, yup_1.string)().notRequired(),
        country: (0, yup_1.string)().notRequired(),
        state: (0, yup_1.string)().notRequired(),
        city: (0, yup_1.string)().notRequired(),
        nationality: (0, yup_1.string)().notRequired(),
        sex: (0, yup_1.string)().notRequired(),
        dob: (0, yup_1.date)().notRequired(),
        phoneNumber1: (0, yup_1.number)().notRequired(),
        phoneNumber2: (0, yup_1.number)().notRequired(),
    }),
});
exports.GetUserProfileInput = (0, yup_1.object)({
    params: (0, yup_1.object)({
        id: (0, yup_1.string)().required("Provide user id"),
    }),
});
