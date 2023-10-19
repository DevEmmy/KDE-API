"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordInput = exports.ResetPasswordInput = exports.RequestPasswordResetInput = exports.VerifyEmailInput = exports.LoginInput = exports.SignupInput = void 0;
const yup_1 = require("yup");
exports.SignupInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        firstName: (0, yup_1.string)().required("FirstName is required"),
        lastName: (0, yup_1.string)().required("Lastname is required"),
        phoneNumber1: (0, yup_1.number)().required("phoneNumber1 is required"),
        email: (0, yup_1.string)()
            .required("Email is required")
            .email("Provide a valid email"),
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(8, "Password must not be less than 8 characters"),
        confirmPassword: (0, yup_1.string)()
            .required("confirmPassword is required")
            .min(8, "Confirm password must not be less than 8 charcters"),
    }),
});
exports.LoginInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .required("Email is required")
            .email("Provide a valid email"),
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(8, "Password must not be less than 8 characters"),
    }),
});
exports.VerifyEmailInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        token: (0, yup_1.string)().required("Provide token"),
    }),
});
exports.RequestPasswordResetInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)().required("Provide email").email("Provide a valid email"),
    }),
});
exports.ResetPasswordInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(8, "Password must not be less than 8 characters"),
        confirmPassword: (0, yup_1.string)()
            .required("confirmPassword is required")
            .min(8, "Confirm password must not be less than 8 charcters"),
        code: (0, yup_1.string)().required("Provide code"),
    }),
});
exports.ChangePasswordInput = (0, yup_1.object)({
    body: (0, yup_1.object)({
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(8, "Password must not be less than 8 characters"),
        confirmPassword: (0, yup_1.string)()
            .required("confirmPassword is required")
            .min(8, "Confirm password must not be less than 8 charcters"),
        oldPassword: (0, yup_1.string)()
            .required("Old password is required")
            .min(8, "Password must not be less than 8 characters"),
    }),
});
