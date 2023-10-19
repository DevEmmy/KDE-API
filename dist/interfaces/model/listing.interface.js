"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICarConditions = exports.IListingType = void 0;
/**
 * Let the property have an owner
 * when someone else buys it, he/she becomes the owner
 * have a tenant attribute
 */
var IListingType;
(function (IListingType) {
    IListingType["sale"] = "sale";
    IListingType["rent"] = "rent";
})(IListingType || (exports.IListingType = IListingType = {}));
var ICarConditions;
(function (ICarConditions) {
    ICarConditions["new"] = "new";
    ICarConditions["used"] = "used";
})(ICarConditions || (exports.ICarConditions = ICarConditions = {}));
