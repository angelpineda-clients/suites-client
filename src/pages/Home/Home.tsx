import { Container } from "@mui/material";
import { useNavigate } from "react-router";

import { useBookingStore } from "@/store/booking";

import { ISearchRoom } from "../SearchRoom/SearchRoom";

import SearchRoomForm from "@/components/Form/SearchRoomForm/SearchRoomForm";

const Home = () => {
	const navigate = useNavigate();
	const setBooking = useBookingStore((state) => state.setBooking);

	async function onSubmit(data: ISearchRoom) {
		const newBooking = {
			...data,
			checkIn: data.check_in,
			checkOut: data.check_out,
		};
		setBooking(newBooking);

		navigate(
			`/search-room?check_in=${data?.check_in}&check_out=${data.check_out}&adults=${data.adults}&children=${data.children}`
		);
	}

	return (
		<Container sx={{ minHeight: "70vh" }}>
			<SearchRoomForm onSubmit={onSubmit} />
		</Container>
	);
};

export default Home;
