import { Types } from "mongoose";

export enum IUserTypes {
  buyer = "buyer",
  seller = "seller",
}

export enum ITokenTypes {
  passwordResetToken = "passwordResetToken",
  accountVerificationToken = "accountVerificationToken",
}

export enum ISex {
  male = "male",
  female = "female",
  // no LGBTQ 😅
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  otherNames: string;
  about: string;
  profilePicture: string;
  facebookUrl: string;
  instagramUrl: string;
  website: string;
  address: string;
  country: string;
  state: string;
  city: string;
  nationality: string;
  sex: ISex.male | ISex.female;
  dob: Date | string;
  phoneNumber1: number;
  phoneNumber2: number;
  profileViews: number;
  accountNumber: number;
  bankName: string;
  accountName: string;
  //   generally everybody should be allowed to buy a property, so we only need isSeller
  isSeller: boolean;
  totalListings: number;
  totalAvailableListings: number;
  subscribedToNewsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;

  // update it any time a news letter is sent
  newsLetterDate: number;
}
export interface IUserAuth {
  _id: string;
  email: string;
  password: string;
  confirmPassword: string;
  verified: boolean;
  verifyPassword(password: string): Promise<boolean>;
}

export interface IToken {
  _id: string;
  email: string;
  token: string;
  type: ITokenTypes.accountVerificationToken | ITokenTypes.passwordResetToken;
  createdAt: Date;
  expireAt: Date;
}
