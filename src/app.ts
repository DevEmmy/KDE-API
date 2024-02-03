import express, { Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import { errorHandler, notFound } from "./config/errors.config";
import startServer from "./config/connection.config";
import routes from "./routes/index.routes";
import swagger from "swagger-ui-express";
import loggerMiddleware from "./middlewares/logger";
import { WebhookPayload } from "./interfaces/model/payment.interface";
import { webhook } from "./helpers/payment";

const documentation = require("../doc.config.json");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(loggerMiddleware);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to kde api" });
});

app.use("/doc", swagger.serve, swagger.setup(documentation));

app.use("/api/v2/auth", routes.auth);
app.use("/api/v2/user", routes.user);
app.use("/api/v2/newsletter", routes.newsletter);
app.use("/api/v2/category", routes.category);
app.use("/api/v2/listing", routes.listing);
app.use("/api/v2/article", routes.article);
app.use("/api/v2/property-request", routes.property_request);
app.use("/api/v2/report", routes.report);
app.use("/api/v2/chat", routes.chat);
app.use("/api/v2/cart", routes.cart);
app.use("/api/v2/notification", routes.notifications);
app.use("/api/v2/subscription", routes.subscription);
app.post(
  "/api/v2/webhook",
  async (req: Request<{}, {}, WebhookPayload>, res, next) => {
    try {
      await webhook(req.body);

      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  }
);

app.all("*", notFound);
app.use(errorHandler);

startServer(app);
