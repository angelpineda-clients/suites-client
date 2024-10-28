import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/auth/AuthProvider";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";

const ProtectedRoutes = () => {
	const auth = useAuth();

	if (auth.isLoading) {
		return <Loader />;
	}

	return auth.isAuthenticated ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to="/login" />
	);
};

export default ProtectedRoutes;
