import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/guards/RoleGuard";
import { ROLES } from "@/auth/roles";

import Login from "@/pages/public/Login"
import PropertyList from "@/pages/public/PropertyList";
import PropertyDetail from "@/pages/public/PropertyDetail";

import UserDashboard from "@/pages/user/Dashboard";
import AdminDashboard from "@/pages/admin/Dashboard";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />

            {/* USER */}
            <Route 
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <RoleGuard roles={[ROLES.USER]}>
                            <UserDashboard />
                        </RoleGuard>
                    </ProtectedRoute>
                }
            />

            {/* ADMIN */}
            <Route
                path="/admin">
                element={
                    <ProtectedRoute>
                        <RoleGuard roles={[ROLES.ADMIN]}>
                            <AdminDashboard />
                        </RoleGuard>
                    </ProtectedRoute>
                }
            </Route>
        </Routes>
    );
}