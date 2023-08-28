import { BadRequestError, NotFoundError } from "../helpers/error-responses";
import { IUser } from "../interfaces/model/user.interface";
import User from "../models/user.model";
import { AuthService } from "./auth.service";

export class UserService {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const user = await User.findById<IUser>(id);

      if (!user) {
        throw new NotFoundError("User does not exist");
      }

      return user;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async getUserByEmail(email: string): Promise<IUser> {
    try {
      const user = await User.findOne<IUser>({ email });

      if (!user) {
        throw new NotFoundError("User does not exist");
      }

      return user;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async getUserByAuthId(authId: string): Promise<IUser> {
    try {
      // use the email from the user auth to get the user
      const userAuth = await this.authService.getUserAuth({ _id: authId });

      const user = await this.getUserByEmail(userAuth.email);

      return user;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async editUserProfile(body: Partial<IUser>, _id: string) {
    try {
      const user = await User.findById(_id);

      if (!user) {
        throw new NotFoundError("User does not exist");
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

      const editedInfo = await user.save();

      return editedInfo;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
}
