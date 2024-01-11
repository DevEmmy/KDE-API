import { BadRequestError, ForbiddenError } from "../helpers/error-responses";
import NewsletterSubscription from "../models/newsletter.subscription.model";

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
