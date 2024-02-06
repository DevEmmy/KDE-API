import { Types } from "mongoose";

export interface IPropertyRequest {
    request: string;
    name: string;
    email: string;
    _id: string | Types.ObjectId
}