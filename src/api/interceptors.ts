import { api } from "./axios";
import { tokenStore } from "../auth/tokenStore";

api.interceptors.request.use((config) => {
    const token = tokenStore.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})