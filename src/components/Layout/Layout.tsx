import { useEffect } from "react";

import { Box } from "@mui/material";
import { Outlet } from "react-router";

import { useBookingStore } from "@/store/booking";

import { handleLocalStorage } from "@/helpers/handleLocalStorage";

import Footer from "./components/Footer";
import { Header } from "./components/Header";

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
		if (!booking.checkIn && !booking.checkOut) {
			const bookingStorage = handleLocalStorage.getItem("booking");

			if (bookingStorage) {
				setBooking(bookingStorage);
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
