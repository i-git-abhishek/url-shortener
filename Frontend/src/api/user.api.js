import axiosInstance from "./axiosInstance.js";

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.get("/api/auth/logout");
  return response.data;
};
