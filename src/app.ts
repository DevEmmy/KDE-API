import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import { errorHandler, notFound } from "./config/errors.config";
import startServer from "./config/connection.config";
import routes from "./routes/index.routes";
import swagger from "swagger-ui-express";

const documentation = require("./config/doc.config.json");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to kde api" });
});

app.use("/doc", swagger.serve, swagger.setup(documentation));

app.use("/api/v2/auth", routes.auth);
app.use("/api/v2/user", routes.user);
app.use("/api/v2/newsletter", routes.newsletter);
app.use("/api/v2/category", routes.category);

app.all("*", notFound);
app.use(errorHandler);

startServer(app);
