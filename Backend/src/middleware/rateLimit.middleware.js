import {rateLimit} from "express-rate-limit";

export const generalIpLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 15,
    message: { message: "Too many requests from this IP, please try again after 15 minutes." }, standardHeaders: true,
    legacyHeaders: false,
});

export const userUrlCreationLimiter = rateLimit({
    windowMs: 24*60*60*1000,
    max: 10,
    message: { message: "Daily limit reached. Come back tomorrow" },
    standardHeaders: true,
    legacyHeaders: false,

    keyGenerator: (req) =>{
        if(req.user && req.user._id){
            return req.user._id.toString();
        }
        return req.ip;
    }
});