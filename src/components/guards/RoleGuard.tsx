import { Navigate } from "react-router-dom";
import { getUserRole } from "@/auth/auth"; 
import { Role } from "@/auth/roles";
import { ReactNode } from "react";

export default function RoleGuard({
    roles,
    children
}: {
    roles: Role[];
    children: ReactNode;
}) {
    const role = getUserRole();

    if (!role || !roles.includes(role as Role)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return children;
}