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
exports.UserService = void 0;
const uploader_config_1 = require("../config/uploader.config");
const error_responses_1 = require("../helpers/error-responses");
const user_auth_model_1 = __importDefault(require("../models/user.auth.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_service_1 = require("./auth.service");
class UserService {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(id);
            if (!user) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            return user;
        });
    }
    getUserByAuthId(authId) {
        return __awaiter(this, void 0, void 0, function* () {
            // use the email from the user auth to get the user
            const userAuth = yield this.authService.getUserAuth({ _id: authId });
            const user = yield this.getUserByEmail(userAuth.email);
            return user;
        });
    }
    editProfile(body, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(_id);
            if (!user) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            user.firstName = body.firstName || user.firstName;
            user.lastName = body.lastName || user.lastName;
            user.otherNames = body.otherNames || user.otherNames;
            user.about = body.about || user.about;
            user.website = body.website || user.website;
            user.facebookUrl = body.facebookUrl || user.facebookUrl;
            user.instagramUrl = body.instagramUrl || user.instagramUrl;
            user.address = body.address || user.address;
            user.country = body.country || user.country;
            user.state = body.state || user.state;
            user.city = body.city || user.city;
            user.nationality = body.nationality || user.nationality;
            user.sex = body.sex || user.sex;
            user.dob = body.dob || user.dob;
            user.phoneNumber1 = body.phoneNumber1 || user.phoneNumber1;
            user.phoneNumber2 = body.phoneNumber2 || user.phoneNumber2;
            user.accountName = body.accountName || user.accountName;
            user.accountNumber = body.accountNumber || user.accountNumber;
            user.bankName = body.bankName || user.bankName;
            const editedInfo = yield user.save();
            return editedInfo;
        });
    }
    deleteAccount(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(_id);
            yield user_auth_model_1.default.findOneAndDelete({ email: user.email });
            yield user_model_1.default.findByIdAndDelete(_id);
        });
    }
    becomeASeller(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(_id);
            if (!user) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            if (user.isSeller) {
                throw new error_responses_1.ForbiddenError("User is already a seller");
            }
            user.isSeller = true;
            yield user.save();
        });
    }
    viewUserProfile(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(_id);
            if (!user) {
                throw new error_responses_1.NotFoundError("User does not exist");
            }
            user.profileViews += 1;
            yield user.save();
            return user;
        });
    }
    updateProfilePicture(file, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield (0, uploader_config_1.uploadToCloud)(file);
            yield user_model_1.default.findByIdAndUpdate(userId, { profilePicture: image });
            return image;
        });
    }
}
exports.UserService = UserService;
