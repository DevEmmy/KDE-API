import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import { errorHandler, notFound } from "./config/errors.config";
import startServer from "./config/connection.config";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to kde api" });
});

app.all("*", notFound);
app.use(errorHandler);

startServer(app);
