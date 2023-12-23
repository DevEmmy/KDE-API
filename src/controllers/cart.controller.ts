import { NextFunction, Response } from "express";
import { CartService } from "../services/cart.service";
import { IRequest } from "../interfaces/CustomExpressHandlers";

class CartControllers {
  private readonly cartServices: CartService;

  constructor() {
    this.cartServices = new CartService();
  }

  public createCart = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.cartServices.initiateCart(req.userId as string);
      res.status(201).json({ message: "success", data });
    } catch (error) {
      return next(error);
    }
  };

  public addToCart = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const collectibleId = req.body.collectibleId;
      const userId = req.userId as string;

      const data = await this.cartServices.addToCart(userId, collectibleId);

      res.status(201).json({ message: "success", data });
    } catch (error) {
      return next(error);
    }
  };

  public deleteFromCart = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const collectibleId = req.body.collectibleId;
    const userId = req.userId;
    try {
      await this.cartServices.deleteFromCart(userId as string, collectibleId);

      res.status(200).json({ message: "success", data: null });
    } catch (error) {
      return next(error);
    }
  };

  public getAllCart = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userId as string;

      const data = await this.cartServices.getCart(userId);

      res.status(200).json({ message: "success", data });
    } catch (error) {
      return next(error);
    }
  };

  public clearCart = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.cartServices.clearCart(req.userId as string);

      res.status(200).json({ message: "success", data: null });
    } catch (error) {
      return next(error);
    }
  };

  public deleteMultiple = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const collectibleId = req.body.collectibleId;
    const userId = req.userId;
    try {
      await this.cartServices.deleteMultiple(userId as string, collectibleId);

      res.status(200).json({ message: "success", data: null });
    } catch (error) {
      return next(error);
    }
  };
}

const cartControllers = new CartControllers();

export default cartControllers;
