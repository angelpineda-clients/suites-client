import React from "react";
import { extendTheme } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import LayersIcon from "@mui/icons-material/Layers";
import { Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout as Layout } from "@toolpad/core/DashboardLayout";
import { useUserStore } from "@/store/user";
import { useAuth } from "@/context/auth/AuthProvider";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { Box, Button, Typography } from "@mui/material";

interface LayoutProps {
	children: React.ReactNode;
}

const NAVIGATION: Navigation = [
	{
		kind: "header",
		title: "Dashboard",
	},
	{
		segment: "dashboard",
		title: "Dashboard",
		icon: <ShoppingCartOutlinedIcon />,
	},
	{
		segment: "orders",
		title: "Reservaciones",
		icon: <BookOutlinedIcon />,
	},
	{
		kind: "divider",
	},
	{
		kind: "header",
		title: "Administracion",
	},
	{
		segment: "rooms",
		title: "Habitaciones",
		icon: <BedOutlinedIcon />,
	},
	{
		segment: "catalogs",
		title: "Catalogos",
		icon: <LayersIcon />,
	},
];

const demoTheme = extendTheme({
	colorSchemeSelector: "class",
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
});

const BRANDING = {
	title: "",
	logo: "",
};

function Logout() {
	const user = useUserStore((state) => state.user);
	const auth = useAuth();

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				alignContent: "space-between",
				width: "100%",
			}}
		>
			<Typography sx={{ mr: 2 }}>{user.name}</Typography>
			<Button onClick={auth.logout} variant="outlined">
				Logout
			</Button>
		</Box>
	);
}

const DashboardLayout = ({ children }: LayoutProps) => {
	return (
		<AppProvider navigation={NAVIGATION} theme={demoTheme} branding={BRANDING}>
			<Layout
				slots={{
					toolbarActions: Logout,
				}}
				defaultSidebarCollapsed
			>
				{children}
			</Layout>
		</AppProvider>
	);
};

export default DashboardLayout;
