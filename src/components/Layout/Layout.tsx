import { Container } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

interface Layout {
	children: JSX.Element;
}

const Layout = () => {
	return (
		<Container>
			<Header />
			<Outlet />
			<Footer />
		</Container>
	);
};

export default Layout;
