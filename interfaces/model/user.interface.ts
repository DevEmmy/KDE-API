import { Types } from 'mongoose';

export enum IUserTypes {
  buyer = 'buyer',
  seller = 'seller',
}

export enum ITokenTypes {
  passwordResetToken = 'passwordResetToken',
  accountVerificationToken = 'accountVerificationToken',
}

export type UserPageViews = {
  value: number;
  users: string[] | Types.ObjectId[] | IUser[];
};

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  otherNames: string;
  about: string;
  cover: string;
  profilePicture: string;
  facebookUrl: string;
  instagramUrl: string;
  websiteUrl: string;
  address: string;
  country: string;
  state: string;
  stateOfResidence: string;
  city: string;
  nationality: string;
  sex: string;
  dob: Date | string;
  phoneNumber1: number;
  phoneNumber2: number;
  pageViews: UserPageViews;

  isAdmin: boolean;
  savedListing: string[] | Types.ObjectId[] | IUser[];
  totalSaved: { value: number; users: string | Types.ObjectId | IUser };
  gender: string;
  createdAt: Date;
  updatedAt: Date;

  accountNo: string;
  bankName: string;
  accountName: string;
  balanceAmount: number;

  isVerified: boolean;
  zipCode: number;

  // user account
  accountType: number;
  subscribed: boolean;
  noOfSubscription: number;
  userType: number;
  sellerType: number;
  totalListing: number;

  locationISO: string;
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
