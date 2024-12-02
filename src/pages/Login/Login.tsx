/* Libraries */
import { Navigate } from "react-router";
import { Box, Container, Typography } from "@mui/material";
/* Components */
import LoginForm from "./components/LoginForm/LoginForm";
import { useAuth } from "@/context/auth/AuthProvider";
/* Styles */
import "./styles/login.css";

const Login = () => {
	const auth = useAuth();

	if (auth.isAuthenticated) {
		return <Navigate to="/dashboard" />;
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
