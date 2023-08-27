import { v4 } from "uuid";
import sendMail from "../config/mailer.config";
import { verifyEmailHTML } from "../constants/mails";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../helpers/error-responses";
import {
  IToken,
  ITokenTypes,
  IUser,
  IUserAuth,
} from "../interfaces/model/user.interface";
import Auth from "../models/user.auth.model";
import User from "../models/user.model";
import Token from "../models/user.token.model";
import JWTHelper from "../helpers/Jwt.helper";
import { ILoginRes } from "../interfaces/CustomResponses/auth.response";

export class AuthService {
  private async createToken(email: string, type: ITokenTypes): Promise<IToken> {
    const token = await Token.create({
      email,
      type: type,
    });

    return token;
  }

  constructor() {}
  async getUserAuth(param: Partial<IUserAuth>): Promise<IUserAuth> {
    try {
      const user = await Auth.findOne(param);

      if (!user) {
        throw new BadRequestError("User does not exist");
      }

      return user;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async createAccount(body: Partial<IUser & IUserAuth>) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber1,
      } = body;
      /**
       * Create Account, token and send email
       */

      if (password != confirmPassword) {
        throw new BadRequestError("Passwords do not match");
      }

      await Auth.create({ password, email });

      const user = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber1,
      });

      const token = await this.createToken(
        email as string,
        ITokenTypes.accountVerificationToken
      );

      await sendMail({
        to: email,
        subject: "Verify your account",
        html: verifyEmailHTML(user, token.token),
      });
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestError("A user with this email already exists");
      }
      throw new BadRequestError(error.message);
    }
  }

  async verifyAccount(token: string) {
    try {
      /**
       * Check if the token exist.
       * Check if the account is already verified
       * Verify if not
       */

      const tokenInDb = await Token.findOne({
        token,
        type: ITokenTypes.accountVerificationToken,
      });

      if (!tokenInDb) {
        throw new NotFoundError("Token does not exist or has expired");
      }

      const email = tokenInDb.email;

      await Token.findOneAndDelete({
        token,
        type: ITokenTypes.accountVerificationToken,
      });

      const userAuth = await Auth.findOne({ email });

      if (!userAuth) {
        throw new BadRequestError("User does not exist");
      }

      if (userAuth?.verified) {
        throw new BadRequestError(
          "Account is already verified, kinldy proceed to login"
        );
      }

      userAuth.verified = true;

      await userAuth.save();
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async loginUser(body: Partial<IUserAuth>): Promise<ILoginRes> {
    const { email, password } = body;

    try {
      const userAuth = await Auth.findOne({ email });

      if (!userAuth) {
        throw new NotFoundError("Email/password is incorrect");
      }

      const isPasswordCorrect = await userAuth.verifyPassword(
        password as string
      );

      if (!isPasswordCorrect) {
        throw new BadRequestError("Email/password is incorrect");
      }

      const user = await User.findOne<IUser>({ email });

      if (!userAuth.verified) {
        // delete the previous token if it exists then create a new one
        await Token.findOneAndDelete({
          email,
          type: ITokenTypes.accountVerificationToken,
        });

        const token = await this.createToken(
          email as string,
          ITokenTypes.accountVerificationToken
        );

        await sendMail({
          to: email,
          subject: "Verify account",
          html: verifyEmailHTML(user as IUser, token.token),
        });

        throw new BadRequestError(
          "Your account is not verified, a new verification link has been sent to your email"
        );
      } else {
        const accessToken = await JWTHelper.signAccessToken(
          (user as IUser)._id
        );

        return { accessToken, user: user as IUser };
      }
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
}
