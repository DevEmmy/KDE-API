"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditArticleValidation = exports.AddArticleValidation = void 0;
const yup_1 = require("yup");
exports.AddArticleValidation = (0, yup_1.object)({
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().required(),
        body: (0, yup_1.string)().required(),
        category: (0, yup_1.string)().required(),
    }),
});
exports.EditArticleValidation = (0, yup_1.object)({
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().notRequired(),
        body: (0, yup_1.string)().notRequired(),
        category: (0, yup_1.string)().notRequired(),
    }),
});
