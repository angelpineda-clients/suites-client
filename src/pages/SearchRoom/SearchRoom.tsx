import { useEffect } from "react";

import { Container } from "rsuite";
import { useSearchParams } from "react-router-dom";

import CardContainer from "./RoomCard/CardContainer";
import { useBookingStore } from "@/store/booking";
import SearchRoomForm from "@/components/Form/SearchRoomForm/SearchRoomForm";

const SearchRoom = () => {
	const [params] = useSearchParams();
	const setBooking = useBookingStore((state) => state.setBooking);

	useEffect(() => {
		getSearchParams();
	}, [params]);

	function getSearchParams() {
		const checkIn = params.get("check_in") || null;
		const checkOut = params.get("check_out") || null;
		const adults = params.get("adults") || "2";
		const children = params.get("children") || "0";

		setBooking({
			check_in: checkIn,
			check_out: checkOut,
			adults,
			children,
		});
	}

	return (
		<Container>
			<SearchRoomForm onSubmit={(data) => console.log(data)} />
			{/* controls for pagination */}

			<CardContainer />

			{/* pagination */}
			{/* rooms */}
			{/* pagination */}
		</Container>
	);
};

export default SearchRoom;
