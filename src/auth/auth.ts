export const getAccessToken = () => localStorage.getItem("access_token");

export const getUserRole = () => localStorage.getItem("role");

export const isAuthenticated = () => !!getAccessToken();