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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = __importDefault(require("../constants/settings"));
class JWT {
    decodeSecret(encodedSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = yield Buffer.from(encodedSecret, "base64").toString("ascii");
            return secret;
        });
    }
    constructor() { }
    signAccessToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign({ id: userId }, yield this.decodeSecret(settings_1.default.accessTokenSecret), { expiresIn: "1d" });
            return token;
        });
    }
    verifyAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = yield jsonwebtoken_1.default.verify(token, yield this.decodeSecret(settings_1.default.accessTokenSecret));
            return decodedToken;
        });
    }
}
const JWTHelper = new JWT();
exports.default = JWTHelper;
