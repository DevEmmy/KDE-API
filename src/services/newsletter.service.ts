import sendMail from "../config/mailer.config";
import { newsLetterHTML } from "../constants/mails";
import { BadRequestError, ForbiddenError } from "../helpers/error-responses";
import NewsletterSubscription from "../models/newsletter.subscription.model";
import User from "../models/user.model";

/**
 * Note: Whenever sending newsletter, attach the user email to the button for unsubscribing
 */

export default class NewsletterService {
  constructor() {}

  async subscribeToNewsletter(email: string) {
    const subscriptionExist = await NewsletterSubscription.findOne({ email });

    if (subscriptionExist) {
      throw new BadRequestError(
        "You are already suscribed to CREAM newsletter"
      );
    } else {
      await NewsletterSubscription.create({ email });
      await User.findOneAndUpdate({ email }, { newsLetterDate: Date.now() });
      await sendMail({
        to: email,
        subject: "CREAM WEEKLY NEWSLETTER",
        html: newsLetterHTML,
      });
    }
  }

  async unSubscribeFromNewsletter(email: string) {
    const subscriptionExist = await NewsletterSubscription.findOne({ email });

    if (!subscriptionExist) {
      throw new BadRequestError("You are not suscribed to CREAM newsletter");
    }

    await subscriptionExist.deleteOne();
  }
}
