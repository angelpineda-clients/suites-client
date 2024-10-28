import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useUserStore } from "@/store/stores";
import { useAuth } from "@/context/auth/AuthProvider";

import { useNavigate } from "react-router";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const user = useUserStore((state) => state.user);
	const auth = useAuth();
	const navigate = useNavigate();

	return (
		<>
			<AppBar position="static" sx={{ backgroundColor: "white" }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="primary"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => navigate("/")}
					>
						logo
					</IconButton>
					<Typography
						variant="subtitle2"
						component="div"
						sx={{ flexGrow: 1, mr: 2 }}
						color="primary"
						textAlign="right"
					>
						user name
					</Typography>
					<Button
						color="primary"
						onClick={auth.logout}
						sx={{ border: "thin solid" }}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			{children}
		</>
	);
};

export default Layout;
