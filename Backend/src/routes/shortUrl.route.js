import express from "express"
import { createShortUrl, createCustomUrl } from "../controllers/shortUrl.controller.js";
import { validateUrlInput } from "../middleware/validate.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", validateUrlInput, createShortUrl);
router.post("/custom", authMiddleware, validateUrlInput, createCustomUrl)
 
export default router;