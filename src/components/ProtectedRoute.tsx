import { Navigate, useLocation } from "react-router-dom";
//import { isAuthenticated } from "@/auth/auth";
import { useAuth } from "@/auth/AuthContext";
import { ReactNode } from "react";

export default function ProtectedRoute({
    children
}: {
    children: ReactNode;
}) {    
    const location = useLocation(); 
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Navigate 
                to="/login" 
                replace
                state={{ from: location.pathname }} 
            />
        );
    }
    return children;
}