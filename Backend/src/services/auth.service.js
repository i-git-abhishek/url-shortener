import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.model.js';
import { findUserByEmail, createUser } from '../dao/user.dao.js';
import { signToken } from '../utils/helper.js';

export const registerUser = async (name, email, password) => {
    const newUser = await createUser(name, email, password);
    const token = await signToken({ id: newUser._id});
    return token;
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if(!user ||  user.password !== password)  throw new Error("Invalid credentials");
    const token = await signToken({ id: user._id});
    console.log(token)
    return {token, user};
}