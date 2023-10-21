"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePropertyRequestInput = void 0;
const yup_1 = require("yup");
exports.CreatePropertyRequestInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required("Name is required"),
        email: (0, yup_1.string)().email("Enter valid email").required("Email is required"),
        request: (0, yup_1.string)().required("Request is required"),
    }),
});
