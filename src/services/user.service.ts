import { uploadToCloud } from "../config/uploader.config";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../helpers/error-responses";
import { IUser, UserPageViews } from "../interfaces/model/user.interface";
import Auth from "../models/user.auth.model";
import User from "../models/user.model";
import { AuthService } from "./auth.service";

export class UserService {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await User.findById<IUser>(id);

    if (!user) {
      throw new NotFoundError("User does not exist");
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await User.findOne<IUser>({ email });

    if (!user) {
      throw new NotFoundError("User does not exist");
    }

    return user;
  }

  async getUserByAuthId(authId: string): Promise<IUser> {
    // use the email from the user auth to get the user
    const userAuth = await this.authService.getUserAuth({ _id: authId });

    const user = await this.getUserByEmail(userAuth.email);

    return user;
  }

  async editProfile(body: Partial<IUser>, _id: string): Promise<IUser> {
    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError("User does not exist");
    }

    user.firstName = body.firstName || user.firstName;
    user.lastName = body.lastName || user.lastName;
    user.otherNames = body.otherNames || user.otherNames;
    user.about = body.about || user.about;
    user.websiteUrl = body.websiteUrl || user.websiteUrl;
    user.facebookUrl = body.facebookUrl || user.facebookUrl;
    user.instagramUrl = body.instagramUrl || user.instagramUrl;
    user.address = body.address || user.address;
    user.country = body.country || user.country;
    user.state = body.state || user.state;
    user.stateOfResidence = body.stateOfResidence || user.stateOfResidence;
    user.city = body.city || user.city;
    user.nationality = body.nationality || user.nationality;
    user.zipCode = body.zipCode || user.zipCode;
    user.sex = body.sex || user.sex;
    user.dob = body.dob || user.dob;
    user.phoneNumber1 = body.phoneNumber1 || user.phoneNumber1;
    user.phoneNumber2 = body.phoneNumber2 || user.phoneNumber2;
    user.accountName = body.accountName || user.accountName;
    user.accountNo = body.accountNo || user.accountNo;
    user.bankName = body.bankName || user.bankName;
    user.accountType = body.accountType || user.accountType;
    user.noOfSubscription = body.noOfSubscription || user.noOfSubscription;
    user.sellerType = body.sellerType || user.sellerType;

    const editedInfo = await user.save();

    return editedInfo;
  }

  async deleteAccount(_id: string): Promise<void> {
    const user = await this.getUserById(_id);

    await Auth.findOneAndDelete({ email: user.email });
    await User.findByIdAndDelete(_id);
  }

  async viewUserProfile(_id: string): Promise<IUser> {
    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    (user.pageViews as UserPageViews).value += 1;

    await user.save();

    return user;
  }

  async updateProfilePicture(
    file: Express.Multer.File,
    userId: string
  ): Promise<string> {
    const image = await uploadToCloud(file);

    await User.findByIdAndUpdate(userId, { profilePicture: image });

    return image;
  }
}
