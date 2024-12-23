import { useEffect } from "react";

import { Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { IStoreNewBooking, useBookingStore } from "@/store/booking";

import CardContainer from "./RoomCard/CardContainer";

import SearchRoomForm from "@/components/Form/SearchRoomForm/SearchRoomForm";

const SearchRoom = () => {
	const [params] = useSearchParams();
	const setBooking = useBookingStore((state) => state.setBooking);

	useEffect(() => {
		getSearchParams();
	}, [params]);

	/**
	 * getSearchParams
	 * set state for search params
	 */
	function getSearchParams() {
		const checkIn = params.get("check_in");
		const checkOut = params.get("check_out");
		const adults = params.get("adults");
		const children = params.get("children") || "0";

		if (checkIn && checkOut && adults) {
			setBooking({
				check_in: checkIn,
				check_out: checkOut,
				adults,
				children,
			});
		}
	}

	async function onSubmit(data: IStoreNewBooking) {
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
