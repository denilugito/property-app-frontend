import { Navigate } from "react-router-dom";
import { getUserRole } from "@/auth/auth"; 
import { Role } from "@/auth/roles";
import { ReactNode } from "react";
import { decodeJwt } from "@/auth/jwt";

export default function RoleGuard({
    roles,
    children
}: {
    roles: Role[];
    children: ReactNode;
}) {
    const token = localStorage.getItem("access_token");
    const payload = decodeJwt(token);
    const role = payload.role;

    if (!role || !roles.includes(role as Role)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return children;
}