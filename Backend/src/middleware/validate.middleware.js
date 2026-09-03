import { z } from "zod";

const createUrlSchema = z.object({
  url: z
    .trim()
    .url({ message: "Give a Valid URL"})
    .max(2048, { message: "URL exceeds maximum length of 2048 characters" })
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://"),
      { message: "Invalid URL" }
    ),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Slug can only contain letters, numbers, hyphens, and underscores",
    })
    .min(2, { message: "Slug must be at least 2 characters long" })
    .max(30, { message: "Slug cannot exceed 30 characters" })
    .optional()
    .nullable(),
});

export const validateUrlInput = (req, res, next) => {
  try {
    createUrlSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.errors.map((e) => e.message),
    });
  }
};