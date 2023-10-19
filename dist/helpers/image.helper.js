"use strict";
/**
 * To compress images and avoid slow servers during upload
 */
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
const sharp_1 = __importDefault(require("sharp"));
class ImageService {
    constructor() {
        this.getImageMetadata = (imagePath) => {
            let data;
            (0, sharp_1.default)(imagePath).metadata((error, metadata) => {
                data = metadata;
            });
            return data;
        };
    }
    // convert the images to jpeg
    compressImage(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = this.getImageMetadata(imagePath);
            yield (0, sharp_1.default)(imagePath)
                .resize(800)
                .toFormat("jpeg", { mozjpeg: true })
                .toFile(imagePath + "1");
            return imagePath + "1";
        });
    }
}
const imageService = new ImageService();
exports.default = imageService;
