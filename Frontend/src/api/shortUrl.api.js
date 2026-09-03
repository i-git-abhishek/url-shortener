import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (url,slug) =>{
    if(slug && slug.trim() !== ""){
        const {data} = await axiosInstance.post("/api/create/custom",{url,slug});
        return data.shortUrl;

    }
    const {data} = await axiosInstance.post("/api/create",{url});
    return data.shortUrl
}