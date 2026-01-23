import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/auth/auth";
import { ReactNode } from "react";

export default function ProtectedRoute({
    children
}: {
    children: ReactNode;
}) {    
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}