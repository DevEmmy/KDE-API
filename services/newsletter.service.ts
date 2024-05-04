import sendMail, { renderTemplate } from '../config/mailer.config';
import { BadRequestError, ForbiddenError } from '../helpers/error-responses';
import Listing from '../models/listing.model';
import NewsletterSubscription from '../models/newsletter.subscription.model';
import User from '../models/user.model';

/**
 * Note: Whenever sending newsletter, attach the user email to the button for unsubscribing
 */

export default class NewsletterService {
  constructor() {}

  async subscribeToNewsletter(email: string) {
    const subscriptionExist = await NewsletterSubscription.findOne({ email });

    if (subscriptionExist) {
      throw new BadRequestError('You are already suscribed to CREAM newsletter');
    } else {
      await NewsletterSubscription.create({ email });
      const listings = await Listing.find({ available: true }).sort('-createdAt').limit(5);
      await sendMail({
        to: email,
        subject: 'CREAM WEEKLY NEWSLETTER',
        html: renderTemplate('newsletter.ejs', { listings }),
      });
    }
  }

  async unSubscribeFromNewsletter(email: string) {
    const subscriptionExist = await NewsletterSubscription.findOne({ email });

    if (!subscriptionExist) {
      throw new BadRequestError('You are not suscribed to CREAM newsletter');
    }

    await subscriptionExist.deleteOne();
  }
}
