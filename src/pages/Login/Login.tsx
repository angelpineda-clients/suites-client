/* Libraries */
import { Box, Container, Typography } from "@mui/material";
/* Components */
import LoginForm from "./components/LoginForm/LoginForm";
/* Styles */
import "./styles/login.css";
import { useAuth } from "../../context/auth/AuthProvider";
import { Navigate } from "react-router";

const Login = () => {
	const auth = useAuth();

	if (auth.isAuthenticated) {
		return <Navigate to="/" />;
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
