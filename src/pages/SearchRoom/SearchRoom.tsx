import { useEffect, useState } from "react";

import { Container } from "rsuite";
import { useSearchParams } from "react-router-dom";

import HomeForm from "../Home/components/HomeForm";

import CardContainer from "./RoomCard/CardContainer";

const SearchRoom = () => {
	const [params] = useSearchParams();
	const [search, setSearch] = useState({});

	useEffect(() => {
		getSearchParams();
	}, [params]);

	function getSearchParams() {
		const checkIn = params.get("check_in");
		const checkOut = params.get("check_out");
		const adults = params.get("adults");
		const children = params.get("children");

		setSearch({
			checkIn,
			checkOut,
			adults,
			children,
		});
	}

	return (
		<Container>
			<HomeForm />
			{/* controls for pagination */}

			<CardContainer {...search} />

			{/* pagination */}
			{/* rooms */}
			{/* pagination */}
		</Container>
	);
};

export default SearchRoom;
