import { useEffect } from "react";

import { Stack } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useBookingStore } from "@/store/booking";

import CardContainer from "./RoomCard/CardContainer";

import SearchRoomForm from "@/components/Form/SearchRoomForm/SearchRoomForm";

export interface ISearchRoom {
	check_in: string;
	check_out: string;
	adults: string;
	children: string;
}

const SearchRoom = () => {
	const [params] = useSearchParams();
	const navigate = useNavigate();
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
				checkIn,
				checkOut,
				adults,
				children,
			});
		}
	}

	async function onSubmit(data: ISearchRoom) {
		navigate(
			`/search-room?check_in=${data?.check_in}&check_out=${data.check_out}&adults=${data.adults}&children=${data.children}`
		);
	}

	return (
		<Stack gap={4}>
			<SearchRoomForm onSubmit={onSubmit} />

			<CardContainer />
		</Stack>
	);
};

export default SearchRoom;
