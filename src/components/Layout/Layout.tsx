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
	const setCustomer = useBookingStore((state) => state.setCustomer);

	useEffect(() => {
		checkBookingExists();
		checkCustomerData();
	}, []);

	function checkBookingExists() {
		if (!booking.checkIn && !booking.checkOut) {
			const bookingStorage = handleLocalStorage.getItem("booking");

			if (bookingStorage) {
				setBooking(bookingStorage);
			}
		}
	}

	function checkCustomerData() {
		const customer = handleLocalStorage.getItem("customer");
		if (customer) {
			setCustomer(customer);
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
