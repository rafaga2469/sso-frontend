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

export const exchangeAuthorizationCode = async (
  code,
  redirectUri,
  clientId
) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  if (clientId) params.append("client_id", clientId);

  const response = await API.post("/o/token/", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

export const logout = async () => {
  await API.post("/logout/");
};
