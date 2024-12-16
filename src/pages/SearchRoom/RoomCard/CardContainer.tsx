import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { roomService } from "@/services/room.service";
import RoomCard from "./RoomCard";
import { IRoom } from "@/interfaces/models/IRoom";

interface SearchProps {
	checkIn: string;
	checkOut: string;
	adults: string;
	children: string;
}

const CardContainer = (search: SearchProps) => {
	const [rooms, setRooms] = useState<IRoom[]>([]);

	useEffect(() => {
		getRooms();
	}, [search]);

	async function getRooms() {
		if (!search.checkOut) return;

		const response = await roomService.searchRoom({
			data: search,
			page: 0,
			pageSize: 10,
		});

		setRooms(response?.items);
	}
	return (
		<Stack gap={2}>
			{rooms?.map((room) => {
				return <RoomCard key={room.id} {...room} />;
			})}
		</Stack>
	);
};

export default CardContainer;
