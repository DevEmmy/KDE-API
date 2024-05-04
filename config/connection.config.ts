import { connect } from "mongoose";
import settings from "../constants/settings";
import { Application } from "express";
import logger from "./logger.config";
import { newsletterCron } from "../jobs/newsletter-cron";
import seedData from "../seeders/seed-data";

const startServer = (app: Application) => {
  connect(settings.mongo.url as string)
    .then(async () => {
      app.listen(settings.port, () => {
        logger.info(`Server is listening on port ${settings.port}`);
      });
      await seedData();
      await newsletterCron();
    })
    .catch((error: any) => {
      logger.error(`Unable to connect to mongoose server, ${error.toString()}`);
      process.exit(1);
    });
};

export default startServer;
