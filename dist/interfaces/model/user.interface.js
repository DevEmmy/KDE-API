"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISex = exports.ITokenTypes = exports.IUserTypes = void 0;
var IUserTypes;
(function (IUserTypes) {
    IUserTypes["buyer"] = "buyer";
    IUserTypes["seller"] = "seller";
})(IUserTypes || (exports.IUserTypes = IUserTypes = {}));
var ITokenTypes;
(function (ITokenTypes) {
    ITokenTypes["passwordResetToken"] = "passwordResetToken";
    ITokenTypes["accountVerificationToken"] = "accountVerificationToken";
})(ITokenTypes || (exports.ITokenTypes = ITokenTypes = {}));
var ISex;
(function (ISex) {
    ISex["male"] = "male";
    ISex["female"] = "female";
    // no LGBTQ 😅
})(ISex || (exports.ISex = ISex = {}));
