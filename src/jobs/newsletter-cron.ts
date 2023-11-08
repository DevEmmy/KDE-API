import sendMail from "../config/mailer.config";
import User from "../models/user.model";
import cron from "node-cron";

export const newsletterCron = () =>
  cron.schedule("* * * * * *", async () => {
    /*
     * every midnight 👻 fetch all users, check if the last time they received a newsletter is up to a week
     */

    const users = await User.find({});

    for (const user of users) {
      const currentDate = Date.now();

      const lastLetterDate = user.newsLetterDate;

      const ONE_WEEK = 1000 * 60 * 6 * 24 * 7;

      if (currentDate - lastLetterDate >= ONE_WEEK) {
        // send news letter

        await sendMail({
          to: user.email,
          subject: "CREAM WEEKLY NEWSLETTER",
          text: "Hello, this is cream weekly newsletter",
        });

        user.newsLetterDate = Date.now();
        await user.save();

        return;
      } else {
        return;
      }
    }
  });
