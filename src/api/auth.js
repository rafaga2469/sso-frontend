// src/api/auth.js
import API from "./axios";

export const login = async (email, password) => {
  const response = await API.post("/token/", {
    email,
    password,
  });
  return response.data;
};

export const loginWithCookie = async (email, password) => {
  const response = await API.post("/token/cookie/", {
    email,
    password,
  });
  return response.data;
};

export const refreshAccess = async () => {
  const response = await API.post("/token/refresh/");
  return response.data;
};

export const getUserInfo = async () => {
  const response = await API.get("/me/");
  return response.data;
};


export const logout = async () => {
  await API.post("/logout/");
};
