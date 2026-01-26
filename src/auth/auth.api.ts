import { api } from "../api/axios";
import { tokenStore } from "./tokenStore";

export async function login(username: string, password: string) {
    const res = await api.post("/auth/login", { username, password });

    tokenStore.setAccessToken(res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    return res.data;
};

export const refreshToken = async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
};