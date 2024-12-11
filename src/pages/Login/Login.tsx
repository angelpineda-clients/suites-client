/* Libraries */
import { Navigate } from "react-router";
import { Box, Container, Typography } from "@mui/material";
/* Components */
import LoginForm from "./components/LoginForm/LoginForm";
import { useAuth } from "@/context/auth/AuthProvider";
/* Styles */
import "./styles/login.css";
import { useUserStore } from "@/store/user";

const Login = () => {
	const auth = useAuth();
	const user = useUserStore((state) => state.user);

	if (auth.isAuthenticated) {
		const isAdmin = user.roles?.includes("admin");

		if (isAdmin) {
			return <Navigate to="/Dashboard" />;
		} else {
			return <Navigate to="/" />;
		}
	}
	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography
					variant="h5"
					component="h5"
					marginBottom={4}
					textAlign="center"
				>
					Login
				</Typography>

				<LoginForm />
			</Box>
		</Container>
	);
};

export default Login;
