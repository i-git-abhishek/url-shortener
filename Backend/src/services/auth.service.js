import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.model.js';
import { findUserByEmail, createUser, findUserByEmailandPassword } from '../dao/user.dao.js';
import { signToken } from '../utils/helper.js';

export const registerUser = async (name, email, password) => {
    const newUser = await createUser(name, email, password);
    const token = await signToken({ id: newUser._id});
    return token;
}

export const loginUser = async (email, password) => {

    const user = await findUserByEmailandPassword(email);
    if(!user)   throw new Error("Invalid Credentials");

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid)  throw new Error("Invalid Credentials"); 

    const token = await signToken({ id: user._id});
    console.log(token)
    return {token, user};
}