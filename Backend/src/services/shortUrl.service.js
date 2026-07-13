import { generateNanoId } from "../utils/helper.js";
 import { saveShortUrl } from "../dao/shortUrl.js";
 import { getCustomShortUrl } from "../dao/shortUrl.js";

export const shortUrlServiceWithoutUser = async (url) => {
  try {
    const shortURL = generateNanoId(8);
    await saveShortUrl(shortURL, url);
    return shortURL;
  } catch (error) {
    console.error("Error in shortUrlServiceWithoutUser:", error.message);
    throw error;
  }
};

export const shortUrlServiceWithUser = async (url, user, slug=null) => {
  try {
    const shortURL = slug ||  generateNanoId(8);
    const exists = await getCustomShortUrl(slug);
    if (exists) {
      throw new Error("Short URL already exists. Please try again.");
    }
    await saveShortUrl(shortURL, url, user);
    return shortURL;
  } catch (error) {
    console.error("Error in shortUrlServiceWithUser:", error.message);
    throw error;
  }
};

