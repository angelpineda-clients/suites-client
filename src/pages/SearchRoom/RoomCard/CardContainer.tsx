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
import PaginationBar from "@/components/PaginationBar/PaginationBar";
import usePagination from "@/hooks/usePagination";

const CardContainer = (search: SearchProps) => {
	const [rooms, setRooms] = useState<IRoom[]>([]);
	const { pagination, onPagination, setPagination } = usePagination({
		page: 0,
		pageSize: 5,
	});

	useEffect(() => {
		getRooms();
	}, [search, pagination.page, pagination.pageSize]);

	async function getRooms() {
		if (!search.checkOut) return;

		const response = await roomService.searchRoom({
			data: search,
			page: pagination.page,
			pageSize: pagination.pageSize,
		});

		setRooms(response?.items);
		setPagination(response?.pagination);
	}

	return (
		<Stack gap={2}>
			<PaginationBar pagination={pagination} onPagination={onPagination} />
			{rooms?.map((room) => {
				return <RoomCard key={room.id} {...room} />;
			})}
			<PaginationBar pagination={pagination} onPagination={onPagination} />
		</Stack>
	);
};

export default CardContainer;
