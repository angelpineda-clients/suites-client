import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useUserStore } from "@/store/user";
import { useAuth } from "@/context/auth/AuthProvider";

import { useNavigate } from "react-router";
import React from "react";
import { AppProvider } from "@toolpad/core/react-router-dom";

interface LayoutProps {
	children: React.ReactNode;
}

const NAVIGATION: Navigation = [
	{
		kind: "header",
		title: "Main items",
	},
	{
		segment: "dashboard",
		title: "Dashboard",
		icon: <DashboardIcon />,
	},
	{
		segment: "orders",
		title: "Orders",
		icon: <ShoppingCartIcon />,
	},
	{
		kind: "divider",
	},
	{
		kind: "header",
		title: "Analytics",
	},
	{
		segment: "reports",
		title: "Reports",
		icon: <BarChartIcon />,
		children: [
			{
				segment: "sales",
				title: "Sales",
				icon: <DescriptionIcon />,
			},
			{
				segment: "traffic",
				title: "Traffic",
				icon: <DescriptionIcon />,
			},
		],
	},
	{
		segment: "integrations",
		title: "Integrations",
		icon: <LayersIcon />,
	},
];

const demoTheme = extendTheme({
	colorSchemes: { light: true, dark: true },
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

function useDemoRouter(initialPath: string): Router {
	const [pathname, setPathname] = React.useState(initialPath);

	const router = React.useMemo(() => {
		return {
			pathname,
			searchParams: new URLSearchParams(),
			navigate: (path: string | URL) => setPathname(String(path)),
		};
	}, [pathname]);

	return router;
}

const Layout = ({ children }: LayoutProps) => {
	const user = useUserStore((state) => state.user);
	const auth = useAuth();
	const navigate = useNavigate();

	const router = useDemoRouter("/dashboard");

	return (
		<AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
			<DashboardLayout>{children}</DashboardLayout>
		</AppProvider>
	);
};

export default Layout;
