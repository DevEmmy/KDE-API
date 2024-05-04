import { NextFunction, Request, Response } from "express";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import CategoryService from "../services/category.service";

class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public addCategory = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title } = req.body;

      const data = await this.categoryService.addCategory({ title });

      res.status(201).json({ message: "Category created successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public editCategory = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title } = req.body;
      const { id } = req.params;

      const data = await this.categoryService.editCategory({ _id: id, title });

      res.status(200).json({ message: "Category edited successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public deleteCategory = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      await this.categoryService.deleteCategory(id);

      res
        .status(200)
        .json({ message: "Category deleted successfully", data: null });
    } catch (error) {
      return next(error);
    }
  };

  public getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categories = await this.categoryService.getAllCategories();

      res
        .status(200)
        .json({ message: "Categories fetched successfully", data: categories });
    } catch (error) {
      return next(error);
    }
  };
}

const categoryController = new CategoryController();

export default categoryController;
