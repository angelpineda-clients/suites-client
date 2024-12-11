import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/auth/AuthProvider";
import DashboardLayout from "../Layout/DashboardLayout";
import Loader from "../Loader/Loader";
import { useUserStore } from "@/store/user";

const ProtectedRoutes = () => {
	const auth = useAuth();
	const user = useUserStore((state) => state.user);

	if (auth.isLoading) {
		return <Loader />;
	}

	const isAdmin = user.roles?.includes("admin");

	return isAdmin ? (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	) : (
		<Navigate to="/" />
	);
};

export default ProtectedRoutes;
