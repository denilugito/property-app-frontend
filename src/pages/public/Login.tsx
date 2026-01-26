import { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "@/api/axios";
import { decodeJwt } from "@/auth/jwt";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/api/auth/login", {
                username,
                password,
            });

            const { accessToken, refreshToken } = res.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            const payload = decodeJwt(accessToken);
            const roles: string[] = payload.roles || [];

            let target = from;

            // If user landed on login directly (from === "/")
            // decide based on role
            if(from === "/") {
                if (roles.includes("ROLE_ADMIN")) {
                    target = "/admin/properties";
                } else {
                    target = "/properties";
                }
            }

            navigate(target, { replace: true });
        } catch (err: any) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">Y's Property</h1>
                <p className="login-subtitle">
                    Login as customer or property agent    
                </p>

                <form onSubmit={handleLogin} className="login-form">
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input 
                        type="text" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <div className="login-error">{error}</div>}
                    
                    <button type="submit">Login</button>
                </form>                

                <p className="login-footer">
                    Guest can browse properties without login
                </p>
            </div>
        </div>
    )
}