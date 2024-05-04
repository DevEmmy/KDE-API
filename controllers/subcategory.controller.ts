import { NextFunction, Request, Response } from 'express';
import SubCategoryService from '../services/subcategory.service';
import { IListingSubCategory } from '../interfaces/model/listing.interface';
import { uploadListingMedia, uploadToCloud } from '../config/uploader.config';

class SubCategoryController {
  private readonly subcategoryService: SubCategoryService;

  constructor() {
    this.subcategoryService = new SubCategoryService();
  }

  public createSubcategory = async (req: Request<{}, {}, Partial<IListingSubCategory>>, res: Response, next: NextFunction) => {
    try {
      let image = req.body.image;

      image = (await uploadListingMedia([{ base64: image }]))[0];

      const data = await this.subcategoryService.createSubcategory({ ...req.body, image });

      res.status(201).json({ message: 'created', data });
    } catch (error) {
      return next(error);
    }
  };

  public editSubcategory = async (
    req: Request<{ id: string }, {}, Partial<IListingSubCategory>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let image = req.body.image;
      const id = req.params.id;

      if (image) {
        image = (await uploadListingMedia([{ base64: image }]))[0];
      }

      const data = await this.subcategoryService.editSubcategory(id, { ...req.body, image });

      res.status(200).json({ message: 'edited', data });
    } catch (error) {
      return next(error);
    }
  };

  public getSingleSubcategory = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const data = await this.subcategoryService.getSingleSubcategory(req.params.id);

      res.status(200).json({ message: 'fetched', data });
    } catch (error) {
      return next(error);
    }
  };

  public getSubcategories = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const data = await this.subcategoryService.getSubcategory(req.params.id);

      res.status(200).json({ message: 'fetched', data });
    } catch (error) {
      return next(error);
    }
  };

  public deleteSubcategories = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const data = await this.subcategoryService.deleteSubcategory(req.params.id);

      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      return next(error);
    }
  };
}

const subcategoryController = new SubCategoryController();

export default subcategoryController;
