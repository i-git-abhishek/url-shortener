import express from "express";
import {register_user, login_user, logout_user, get_current_user} from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { generalIpLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/register", generalIpLimiter, register_user);
router.post("/login", generalIpLimiter, login_user);

router.post("/logout", authMiddleware, logout_user);
router.get("/me", authMiddleware, get_current_user);

export default router;