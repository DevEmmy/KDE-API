import { NextFunction, Request, Response } from "express";
import NewsletterService from "../services/newsletter.service";

class NewsletterController {
  private readonly newsletterService: NewsletterService;

  constructor() {
    this.newsletterService = new NewsletterService();
  }

  public subscribeToNewsLetter = async (
    req: Request<{}, {}, { email: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;

      await this.newsletterService.subscribeToNewsletter(email);

      res.status(200).json({
        message: "You have successfully subscribed to our newsletter",
        data: null,
      });
    } catch (error) {
      return next(error);
    }
  };

  public unsubscribeFromNewsletter = async (
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.params;

    try {
      await this.newsletterService.unSubscribeFromNewsletter(email);

      res.status(200).json({
        message: "You have successfully unscubscribed from CREAM newsletter",
        data: null,
      });
    } catch (error) {
      return next(error);
    }
  };
}

const newsletterController = new NewsletterController();

export default newsletterController;
