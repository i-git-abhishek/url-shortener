import { getUrlsByUser } from "../dao/shortUrl.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const getAllUserUrls = wrapAsync (async (req, res) => {
    const {_id} = req.user;
    const urls = await getUrlsByUser(_id)
    res.status(200).json({urls})
})