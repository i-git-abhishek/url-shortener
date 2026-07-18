import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import urlRoute from "./src/routes/shortUrl.route.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from './src/routes/user.routes.js'
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { attachUser } from "./src/utils/attatchUser.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config("./.env");
const app = express();
const port = process.env.PORT || 3000;

console.log(process.env.APP_URL);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);
app.use("/api/create", shortUrlRoute);
app.use("/api/urls", urlRoute);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`App is running on port http://localhost:3000`);
});
