import axios from "axios";
import { ENV } from "@/config/env";
import { authStore } from "@/auth/authStore";
import { refreshToken } from "@/auth/auth.api";

export const api = axios.create({
    baseURL: ENV.API_BASE_URL,
    headers: {
        "content-Type": "application/json"
    },
    withCredentials: true
});

/*  ===========================
    REQUEST INTERCEPTOR
    =========================== */
api.interceptors.request.use((config) => {
    const isAuthEndPoint = 
        config.url?.includes("/auth/login") ||
        config.url?.includes("/auth/refresh");


    if(!isAuthEndPoint) {
        const token = authStore.getAccessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

/*  ========================
    RESPONSE INTERCEPTOR
    ======================== */

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // -- Fix for wrong password / credentials, do not refresh token
        if (
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/refresh")
        ) {
            authStore.clear();
            return Promise.reject(error);
        }

        if (
            error.response?.status == 401 &&
            !originalRequest._retry &&
            authStore.getAccessToken()
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then((token) =>  {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            isRefreshing = true;

            try {
                const data = await refreshToken();
                authStore.setTokens(data.accessToken, data.refreshToken)

                processQueue(null, data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (err) {
                console.log("enter catch!!");
                processQueue(err, null);
                authStore.clear();
                window.location.href = "/login";                
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
                
        return Promise.reject(error);
    }
);