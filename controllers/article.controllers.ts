import { NextFunction, Request, Response } from "express";
import ArticleServices from "../services/article.service";
import { IRequest } from "../interfaces/CustomExpressHandlers";
import { BadRequestError } from "../helpers/error-responses";
import { uploadListingMedia, uploadToCloud } from "../config/uploader.config";

class ArticleController {
  private readonly articleServices: ArticleServices;
  constructor() {
    this.articleServices = new ArticleServices();
  }

  public getAllArticles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.articleServices.getArticles({});

      res.status(200).json({ message: "Articles fetched successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public getUserArticles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;

      const data = await this.articleServices.getArticles({ author: userId });

      res
        .status(200)
        .json({ message: "User articles fetched successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public getMyArticles = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = <string>req.userId;

      const data = await this.articleServices.getArticles({ author: userId });

      res
        .status(200)
        .json({ message: "User's articles fetched successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public getSingleArticle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const _id = req.params.id;
      const data = await this.articleServices.findById(_id);

      res.status(200).json({ message: "Article fetchehd successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public addArticle = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const author = <string>req.userId;
      const { title, body, category } = req.body;

      const cover = await uploadListingMedia([req.body.cover]);

      const data = await this.articleServices.addArticle({
        title,
        body,
        category,
        author,
        cover: cover[0],
      });

      res.status(201).json({ message: "Article created successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public editArticle = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const author = <string>req.userId;
      const _id = req.params.id;
      const { title, body, category } = req.body;

      let cover: string | undefined;

      if (req.body.cover) {
        cover = (await uploadListingMedia([req.body.cover]))[0];
      }

      const data = await this.articleServices.editArticle({
        author,
        _id,
        title,
        body,
        category,
        cover: cover as string,
      });

      res.status(201).json({ message: "Article edited successfully", data });
    } catch (error) {
      return next(error);
    }
  };

  public deleteArticle = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = <string>req.userId;
      const _id = req.params.id;

      await this.articleServices.deleteArticle(userId, _id);

      res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
      return next(error);
    }
  };
}

const articleController = new ArticleController();

export default articleController;
