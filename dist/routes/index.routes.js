"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const newsletter_routes_1 = __importDefault(require("./newsletter.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const listing_routes_1 = __importDefault(require("./listing.routes"));
const article_routes_1 = __importDefault(require("./article.routes"));
const property_request_routes_1 = __importDefault(require("./property-request.routes"));
const routes = {
    auth: auth_routes_1.default,
    user: user_routes_1.default,
    newsletter: newsletter_routes_1.default,
    category: category_routes_1.default,
    listing: listing_routes_1.default,
    article: article_routes_1.default,
    property_request: property_request_routes_1.default,
};
exports.default = routes;
