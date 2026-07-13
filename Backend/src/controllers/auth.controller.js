import { cookieOptions } from "../config/config.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { wrapAsync } from "../utils/wrapAsync.js";
   
export const register_user = wrapAsync (async (req, res) => {
    const {name, email, password} = req.body
    const {token, user} = await registerUser(name, email, password)

    res.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({
        message: "User registered successfully",
    })
})

export const login_user = wrapAsync (async (req, res) => {
    const {email, password} = req.body
    const {token, user} = await loginUser(email, password);

    res.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({
        message: "User logged in successfully",
    })
})