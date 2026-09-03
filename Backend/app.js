import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from './src/routes/user.routes.js'
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { attachUser } from "./src/utils/attatchUser.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config("./.env");
const app = express();
const port = process.env.PORT || 3000;
app.set("trust proxy", 1);


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
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(port, () => {
  connectDB();
});
