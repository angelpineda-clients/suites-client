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
		if (!auth.isAuthenticated && !auth.isLoading) {
			navigate("/");
		}
	}, [auth.isAuthenticated]);

	const isAdmin = user.roles?.includes("admin");

	if (auth.isLoading) {
		return <Loader />;
	}

	return isAdmin ? (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	) : (
		<Navigate to="/" />
	);
};

export default ProtectedRoutes;
