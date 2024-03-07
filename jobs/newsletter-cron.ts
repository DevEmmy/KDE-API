import sendMail, { renderTemplate } from '../config/mailer.config';
import Article from '../models/article.model';
import Listing from '../models/listing.model';
import NewsletterSubscription from '../models/newsletter.subscription.model';
import User from '../models/user.model';
import cron from 'node-cron';

export const newsletterCron = () =>
  cron.schedule('0 0 * * *', async () => {
    /*
     * every midnight 👻 fetch all users, check if the last time they received a newsletter is up to a week
     */

    const users = await NewsletterSubscription.find({});

    for (const user of users) {
      const currentDate = Date.now();

      const lastLetterDate = user.lastReceived;

      const ONE_WEEK = 1000 * 60 * 6 * 24 * 7;

      if (currentDate - (lastLetterDate as number) >= ONE_WEEK) {
        // send news letter
        const listings = await Listing.find({ available: true }).sort('-createdAt').limit(5);
        const articles = await Article.find({}).sort('-createdAt').limit(2);

        await sendMail({
          to: user?.email,
          subject: 'CREAM WEEKLY NEWSLETTER',
          html: renderTemplate('newsletter.ejs', { listings, articles }),
        });

        user.lastReceived = Date.now();
        await user.save();

        return;
      } else {
        return;
      }
    }
  });
