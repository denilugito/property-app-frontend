import { api } from "./axios";
import { tokenStore } from "../auth/tokenStore";

let isRefeshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status == 401 && !originalRequest._retry) {

            if (isRefeshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject});
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            isRefeshing = true;

            try {
                const refreshToken =  localStorage.getItem("refreshToken");

                const res = await api.post("/auth/refresh", {
                    refreshToken
                });

                const newAccessToken = res.data.accessToken;
                const newRefreshToken = res.data.refreshToken;

                tokenStore.setAccessToken(newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}}`;

                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                tokenStore.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefeshing = false;
            }
        }

        return Promise.reject(error);
    }
)