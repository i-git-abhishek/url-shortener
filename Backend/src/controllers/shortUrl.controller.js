import {
  shortUrlServiceWithoutUser,
  shortUrlServiceWithUser,
} from "../services/shortUrl.service.js";
import { getLongUrl, getUrlsByUser } from "../dao/shortUrl.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url, slug } = req.body;
    const user = req.user;

    if (!url) {
      const error = new Error("URL is required");
      error.status = 400;
      throw error;
    }
    let shortURL;
    if (user) {
      shortURL = await shortUrlServiceWithUser(url, user, slug);
    } else {
      shortURL = await shortUrlServiceWithoutUser(url);
    }

    res.status(201).json({
      message: "Short URL created successfully",
      shortUrl: process.env.APP_URL + shortURL,
    });
  } catch (error) {
    next(error);
  }
};

export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await getLongUrl(id);

    if (url) {
      res.redirect(url.long_url);
    } else {
      const error = new Error("Short URL not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const createCustomUrl = wrapAsync(async (req, res, next) => {
  try {
    const {url, slug} = req.body;
    const user = req.user;

    if (!user) {
      const error = new Error(
        "Unauthorized User Not Allowed to create custom URL",
      );
      error.status = 401;
      throw error;
    }

    if (!url || !slug) {
      const error = new Error("URL and Custom URL are required");
      error.status = 400;
      throw error;
    }

    const shortURL = await shortUrlServiceWithUser(url, user._id, slug);

    res.status(201).json({
      message: "Custom Short URL created successfully",
      shortUrl: process.env.APP_URL + shortURL,
    });
  } catch (error) {
    next(error);
  }
});

export const listUserUrls = wrapAsync(async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const urls = await getUrlsByUser(user._id);
    const baseUrl = process.env.APP_URL || "http://localhost:3000/";

    const response = urls.map((item) => ({
      _id: item._id,
      long_url: item.long_url,
      short_url: item.short_url,
      full_short_url: baseUrl + item.short_url,
      clicks: item.clicks,
    }));

    res.json(response);
  } catch (error) {
    next(error);
  }
});
