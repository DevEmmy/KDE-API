import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import expressAsyncHandler from "express-async-handler";
import { IUser, IUserAuth } from "../interfaces/model/user.interface";

class AuthController {
  private readonly authServices: AuthService;

  constructor() {
    this.authServices = new AuthService();
  }

  public register = async (
    req: Request<{}, {}, Partial<IUser & IUserAuth>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        firstName,
        lastName,
        password,
        email,
        confirmPassword,
        phoneNumber1,
      } = req.body;

      await this.authServices.createAccount({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber1,
      });

      res.status(201).json({ message: "Verification email sent" });
    } catch (error: any) {
      return next(error.message);
    }
  };

  public verifyAccount = async (
    req: Request<{}, {}, { token: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.body;

    try {
      await this.authServices.verifyAccount(token);

      res.status(200).json({ message: "Account verified successfully" });
    } catch (error: any) {
      return next(error.message);
    }
  };

  public login = async (
    req: Request<{}, {}, Partial<IUserAuth>>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    try {
      const response = await this.authServices.loginUser({ email, password });

      res.status(200).json({
        message: "Login successful",
        data: { accessToken: response.accessToken, user: response.user },
      });
    } catch (error: any) {
      return next(error.message);
    }
  };
}

const authController = new AuthController();

export default authController;
