"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnSubscribeFromNewsletterInput = exports.SubscribeToNewsletterInput = void 0;
const yup_1 = require("yup");
exports.SubscribeToNewsletterInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .required("Email is required")
            .email("Provide a valid email"),
    }),
});
exports.UnSubscribeFromNewsletterInput = (0, yup_1.object)({
    params: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .required("Email is required")
            .email("Provide a valid email"),
    }),
});
