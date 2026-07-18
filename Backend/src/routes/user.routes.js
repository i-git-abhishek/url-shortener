import express from "express";
import {register_user, login_user, logout_user, get_current_user} from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllUserUrls } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/urls", authMiddleware, getAllUserUrls)

export default router;