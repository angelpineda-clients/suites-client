import { Container } from "@mui/material";
import { useNavigate } from "react-router";

import { IStoreNewBooking, useBookingStore } from "@/store/booking";

import SearchRoomForm from "@/components/Form/SearchRoomForm/SearchRoomForm";

const Home = () => {
	const navigate = useNavigate();
	const setBooking = useBookingStore((state) => state.setBooking);

	async function onSubmit(data: IStoreNewBooking) {
		setBooking(data);

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
