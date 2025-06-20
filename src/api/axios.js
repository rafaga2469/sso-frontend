// src/api/axios.js
import axios from "axios";
import { refreshAccess } from "./auth";
import { getGlobalLogout } from "../context/AuthContext";

const EXCLUDED_ENDPOINTS = ["/token", "/token/cookie", "/token/refresh", "/register"];

export const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // usa cookie refresh_token
});

// Agregar el access token automáticamente
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    const isRefreshRequest = config.url.includes("/token/refresh");
    const isExcluded = EXCLUDED_ENDPOINTS.some((endpoint) => config.url.includes(endpoint));

    if (token && config.headers && !isRefreshRequest && !isExcluded) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Manejar 401 y renovar access token con cookie
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/token")
        ) {
            originalRequest._retry = true;
            try {
                localStorage.removeItem("access");
                const data = await refreshAccess();
                const newToken = data.access;
                localStorage.setItem("access", newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                const logout = getGlobalLogout();
                if (logout) await logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
