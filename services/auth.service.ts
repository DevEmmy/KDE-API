import { v4 } from 'uuid';
import sendMail, { renderTemplate } from '../config/mailer.config';
import { BadRequestError, InternalServerError, NotFoundError } from '../helpers/error-responses';
import { IToken, ITokenTypes, IUser, IUserAuth } from '../interfaces/model/user.interface';
import Auth from '../models/user.auth.model';
import User from '../models/user.model';
import Token from '../models/user.token.model';
import JWTHelper from '../helpers/Jwt.helper';
import { ILoginRes } from '../interfaces/CustomResponses/auth.response';
import Crypto from 'crypto';
import { UserService } from './user.service';
import bcrypt from 'bcryptjs';
import { CartService } from './cart.service';
import { hashPassword } from '../helpers/password.helper';
import Subscription from '../models/subscription.model';
import { SubscriptionType } from '../interfaces/model/subscription.interface';
import settings from '../constants/settings';

export class AuthService {
  private async createToken(email: string, type: ITokenTypes, code?: string): Promise<IToken> {
    const body: Partial<IToken> = { email, type };
    if (code) {
      body.token = code;
    }

    const token = await Token.create(body);

    return token;
  }

  private async generateCryptoToken(): Promise<string> {
    const token = Crypto.randomBytes(32).toString('hex');

    return token;
  }

  private readonly cartServices: CartService;

  constructor() {
    this.cartServices = new CartService();
  }

  async getUserAuth(param: Partial<IUserAuth>): Promise<IUserAuth> {
    const user = await Auth.findOne(param);

    if (!user) {
      throw new NotFoundError('User does not exist');
    }

    return user;
  }

  public createAccount = async (body: Partial<IUser & IUserAuth>) => {
    try {
      const { firstName, lastName, email, password, confirmPassword, phoneNumber1 } = body;
      /**
       * Create Account, token and send email
       */

      if (password != confirmPassword) {
        throw new BadRequestError('Passwords do not match');
      }

      const hashedPassword = await hashPassword(password as string);

      await Auth.create({ password: hashedPassword, email });

      const user = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber1,
      });

      const token = await this.createToken(email as string, ITokenTypes.accountVerificationToken);

      await Subscription.create({
        userId: user._id,
        type: SubscriptionType.FREE,
        price: 0,
      });

      const link = `${settings.frontendUrl}/verify-email/${token.token}`;

      await sendMail({
        to: email,
        subject: 'Verify your account',
        html: renderTemplate('verify-email.ejs', { link, user }),
      });
      await this.cartServices.initiateCart(user?._id);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestError('A user with this email already exists');
      }
      throw new BadRequestError(error.message);
    }
  };

  async verifyAccount(token: string) {
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
      throw new NotFoundError('Token does not exist or has expired');
    }

    const email = tokenInDb.email;

    await Token.findOneAndDelete({
      token,
      type: ITokenTypes.accountVerificationToken,
    });

    const userAuth = await Auth.findOne({ email });

    if (!userAuth) {
      throw new NotFoundError('User does not exist');
    }
    const user = await User.findOne({ email });

    if (userAuth?.verified) {
      throw new BadRequestError('Account is already verified, kinldy proceed to login');
    }

    userAuth.verified = true;

    await userAuth.save();

    await sendMail({
      to: email,
      subject: 'Welcome To Cream',
      html: renderTemplate('welcome-message.ejs', { firstName: user?.firstName }),
    });
  }

  async loginUser(body: Partial<IUserAuth>): Promise<ILoginRes> {
    const { email, password } = body;

    const userAuth = await Auth.findOne({ email });

    if (!userAuth) {
      throw new NotFoundError('User does not exist');
    }

    const isPasswordCorrect = await userAuth.verifyPassword(password as string);

    if (!isPasswordCorrect) {
      throw new BadRequestError('password is incorrect');
    }

    const user = await User.findOne<IUser>({ email });

    if (!userAuth.verified) {
      // delete the previous token if it exists then create a new one
      await Token.findOneAndDelete({
        email,
        type: ITokenTypes.accountVerificationToken,
      });

      const token = await this.createToken(email as string, ITokenTypes.accountVerificationToken);

      const link = `${settings.frontendUrl}/verify-email/${token.token}`;

      await sendMail({
        to: email,
        subject: 'Verify your account',
        html: renderTemplate('verify-email.ejs', { link, user }),
      });

      throw new BadRequestError('Your account is not verified, a new verification link has been sent to your email');
    } else {
      const accessToken = await JWTHelper.signAccessToken(userAuth._id);

      return { accessToken, user: user as IUser };
    }
  }

  async sendPasswordResetToken(email: string): Promise<void> {
    const user = await User.findOne<IUser>({ email });

    if (!user) {
      throw new NotFoundError('User does not exist');
    }

    const hex = await this.generateCryptoToken();

    const token = await this.createToken(email, ITokenTypes.passwordResetToken, hex);

    const link = `${settings.frontendUrl}/reset/${token.token}`;

    await sendMail({
      to: email,
      subject: 'Password reset link',
      html: renderTemplate('reset-password.ejs', { user, link }),
    });
  }

  async resetPassword(body: Partial<IUserAuth>, token: string): Promise<void> {
    const { password, confirmPassword } = body;

    if (password != confirmPassword) {
      throw new BadRequestError('Passwords do not match');
    }

    const tokenInDb = await Token.findOne({
      token,
      type: ITokenTypes.passwordResetToken,
    });

    if (!tokenInDb) {
      throw new NotFoundError('Token does not exist or has expired');
    }

    await Auth.findOneAndUpdate(
      { email: tokenInDb.email },
      {
        password: await hashPassword(password as string),
      }
    );

    await tokenInDb.deleteOne();
  }

  async changePassword(body: Partial<IUserAuth & { oldPassword: string }>) {
    const { password, confirmPassword, _id, oldPassword } = body;

    if (password !== confirmPassword) {
      throw new BadRequestError('Password and confirm password do not match');
    }

    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError('User does not exist');
    }

    // check if the old password is correct

    const userAuth = await Auth.findOne({ email: user.email });

    if (!userAuth) {
      throw new NotFoundError('User Auth does not exist');
    }

    const isOldPasswordCorrect = await userAuth?.verifyPassword(oldPassword as string);

    if (!isOldPasswordCorrect) {
      throw new BadRequestError('Old password is incorrect');
    }

    const newPasswordHash = await hashPassword(password as string);
    userAuth.password = newPasswordHash;

    await userAuth?.save();
  }
}
