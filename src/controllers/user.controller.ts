import expressAsyncHandler from "express-async-handler";
import { UserService } from "../services/user.service";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import { NextFunction, Request, Response } from "express";
import { IUser, IUserAuth } from "../interfaces/model/user.interface";
import { BadRequestError } from "../helpers/error-responses";

class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUserProfile = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userId as string;

      const data = await this.userService.getUserById(userId);

      res
        .status(200)
        .json({ message: "User profile fetched successfully", data });
    } catch (error: any) {
      return next(error);
    }
  };

  public editUserProfile = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body as Partial<IUser>;
      const userId = req.userId as string;

      const data = await this.userService.editProfile(body, userId);

      res
        .status(200)
        .json({ message: "User profile updated successfully", data });
    } catch (error: any) {
      return next(error);
    }
  };
  public deleteAccount = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userId as string;

      await this.userService.deleteAccount(userId);

      res
        .status(200)
        .json({ message: "User account deleted successfully", data: null });
    } catch (error: any) {
      return next(error);
    }
  };

  public becomeASeller = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userId as string;

      await this.userService.becomeASeller(userId);

      res.status(200).json({ message: "You are now a seller", data: null });
    } catch (error: any) {
      return next(error);
    }
  };

  public viewUserProfile = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const profileId = req.params.id;

    try {
      const data = await this.userService.viewUserProfile(profileId);

      res
        .status(200)
        .json({ message: "User profile fetched successfully", data });
    } catch (error: any) {
      return next(error);
    }
  };

  public updateProfilePicture = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const file = <Express.Multer.File>req.file;
      const userId = req.userId as string;

      if (!file) {
        throw new BadRequestError("Provide file");
      }

      const image = await this.userService.updateProfilePicture(file, userId);

      res.status(200).json({ message: "Profile picture updated", data: image });
    } catch (error: any) {
      return next(error);
    }
  };
}

const userController = new UserController();

export default userController;
