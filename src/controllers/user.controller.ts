import expressAsyncHandler from "express-async-handler";
import { UserService } from "../services/user.service";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import { NextFunction, Response } from "express";

class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUserProfile = expressAsyncHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const userId = req.userId as string;

        const data = await this.userService.getUserById(userId);

        res
          .status(200)
          .json({ message: "User profile fetched successfully", data });
      } catch (error: any) {
        return next(error.message);
      }
    }
  );
}

const userController = new UserController();

export default userController;
