import User from '../models/user.model.js';

export const findUserByEmail = async (email) => {
    return await User.findOne({email})
}

export const findUserById = async (id) => {
    return await User.findById(id)
}

export const createUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if(user)    throw new Error("User already exists");
    const newUser = new User({name, email, password});
    await newUser.save();
    return newUser;
}

export const updateUser = async (name, email, password, id) => {
    const user = await findUserById(id)
    if(!user)   throw new Error("User not found");
    Object.assign(user, {name, email, password});
    await user.save();
    return user;
}

export const deleteUser = async (id) => {
    const user = await findUserById(id)
    if(!user)   throw new Error("User not found");
    await user.remove();
    return user;
}