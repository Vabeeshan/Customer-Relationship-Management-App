import { Routes, Route } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout";
import Dashboard from "../../components/pages/dashboard";
import LeadsList from "../../components/pages/LeadsList";
import LeadDetail from "../../components/pages/LeadDetail";
import LeadForm from "../../components/pages/LeadForm";
import AuthCallback from "../../auth/authcallback.tsx";
import ProtectedRoute from "./protectedroute.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected layout route — sidebar + navbar wrap all children */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard"      element={<Dashboard />} />
                <Route path="leads"          element={<LeadsList />} />
                <Route path="leads/create"   element={<LeadForm mode="create" />} />
                <Route path="leads/:id"      element={<LeadDetail />} />
                <Route path="leads/:id/edit" element={<LeadForm mode="edit" />} />
            </Route>
        </Routes>
    );
}