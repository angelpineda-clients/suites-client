import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

interface Layout {
	children: JSX.Element;
}

const Layout = () => {
	return (
		<Box>
			<Header />
			<Outlet />
			<Footer />
		</Box>
	);
};

export default Layout;
