import { getUrlsByUser } from "../dao/shortUrl.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const getAllUserUrls = wrapAsync (async (req, res) => {
    const {_id} = req.user;
    const urls = await getUrlsByUser(_id)

    const baseUrl = process.env.APP_URL || "http://localhost:3000/";
    
    const formattedUrls = urls.map((item) => ({
        _id: item._id,
        long_url: item.long_url,
        short_url: item.short_url,
        clicks: item.clicks,
        full_short_url: baseUrl + item.short_url, 
    }));

    res.status(200).json({urls: formattedUrls});
})