import { useEffect } from "react";

import { Container } from "rsuite";
import { useSearchParams } from "react-router-dom";

import CardContainer from "./RoomCard/CardContainer";
import { IStoreNewBooking, useBookingStore } from "@/store/booking";
import SearchRoomForm from "@/components/Form/SearchRoomForm/SearchRoomForm";
import { Stack } from "@mui/material";

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

	async function onSubmit(data: IStoreNewBooking) {
		console.log(data);
		setBooking(data);
	}

	return (
		<Stack gap={4}>
			<SearchRoomForm onSubmit={onSubmit} />

			<CardContainer />
		</Stack>
	);
};

export default SearchRoom;
