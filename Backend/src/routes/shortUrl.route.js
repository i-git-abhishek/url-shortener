import express from "express"
import { createShortUrl, createCustomUrl } from "../controllers/shortUrl.controller.js";
import { validateUrlInput } from "../middleware/validate.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { generalIpLimiter, userUrlCreationLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/", generalIpLimiter, validateUrlInput, createShortUrl);
router.post("/custom", authMiddleware, userUrlCreationLimiter, validateUrlInput, createCustomUrl)
 
export default router;