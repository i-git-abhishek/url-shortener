import mongoose from "mongoose";
import shortURLmodel from "../models/shorturl.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newURL = new shortURLmodel({
      long_url: longUrl,
      short_url: shortUrl,
    });
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      newURL.user = userId;
    }

    await newURL.save();
    return newURL;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Short URL already exists. Please try again.");
    }

    console.error("Error saving short URL:", error.message);
    throw new Error("Failed to save short URL");
  }
};

export const getLongUrl = async (id) => {
  try {
    return await shortURLmodel.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } },
    );
  } catch (error) {
    console.error("Error fetching short URL:", error.message);
    throw new Error("Failed to fetch short URL");
  }
};

export const getCustomShortUrl  = async (slug) => {
  try {
    return await shortURLmodel.findOne({ short_url: slug });
  } catch (error) {
    console.error("Error fetching short URL by slug:", error.message);
    throw new Error("Failed to fetch short URL by slug");
  }
}
