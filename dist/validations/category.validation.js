"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryInput = exports.EditCategoryInput = exports.CreateCategoryInput = void 0;
const yup_1 = require("yup");
exports.CreateCategoryInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().required("Provide title"),
    }),
});
exports.EditCategoryInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().required("Provide title"),
    }),
    params: (0, yup_1.object)({
        id: (0, yup_1.string)().required("Provide category id"),
    }),
});
exports.DeleteCategoryInput = (0, yup_1.object)({
    params: (0, yup_1.object)({
        id: (0, yup_1.string)().required("Provide category id"),
    }),
});
