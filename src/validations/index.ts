import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error: any) {
      return next(error.message);
    }
  };

export default validate;
