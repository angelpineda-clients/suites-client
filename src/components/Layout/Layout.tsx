import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { useBookingStore } from "@/store/booking";
import { useEffect } from "react";

interface Layout {
	children: JSX.Element;
}

const Layout = () => {
	const booking = useBookingStore((state) => state.booking);
	const setBooking = useBookingStore((state) => state.setBooking);

	useEffect(() => {
		checkBookingExists();
	}, []);

	function checkBookingExists() {
		if (!booking.checkIn || !booking.checkOut) {
			const isBooking = localStorage.getItem("booking");

			if (isBooking) {
				setBooking(JSON.parse(isBooking));
			}
		}
	}

	return (
		<Box>
			<Header />
			<Outlet />
			<Footer />
		</Box>
	);
};

export default Layout;
