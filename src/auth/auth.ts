import { decodeJwt } from "./jwt";

export const getAccessToken = () => localStorage.getItem("access_token");

export const getUserRole = () => {
    // This practice is bad, get role directly from decoded jwt token
    // localStorage.getItem("role");

    const token = getAccessToken();
    if (!token) return null;

    try {
        const payload = decodeJwt(token);
        return payload.role;
    } catch {
        return null;
    }
}

// not used anymore
//export const isAuthenticated = () => !!getAccessToken();