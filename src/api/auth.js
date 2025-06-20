// src/api/auth.js
import API from "./axios";

export const login = async (username, password) => {
  const response = await API.post("/token/", {
    username,
    password,
  });
  return response.data;
};

export const loginWithCookie = async (username, password) => {
  const response = await API.post("/token/cookie/", {
    username,
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
