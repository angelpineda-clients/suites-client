import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthProvider";
import { useUserStore } from "@/store/user";
import Loader from "../Loader/Loader";
import DashboardLayout from "../Layout/DashboardLayout";

const ProtectedRoutes = () => {
  const auth = useAuth();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [auth.isAuthenticated, auth.isLoading, navigate]);

  const isAdmin = Array.isArray(user.roles) && user.roles.includes("admin");

  if (auth.isLoading) {
    return <Loader />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return isAdmin ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoutes;
