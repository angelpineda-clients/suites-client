import { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";

import RoomCard from "./RoomCard";
import usePagination from "@/hooks/usePagination";
import PaginationBar from "@/components/PaginationBar/PaginationBar";

import { IRoom } from "@/interfaces/models/IRoom";
import { roomService } from "@/services/room.service";
import { useBookingStore } from "@/store/booking";

const CardContainer = () => {
	const [rooms, setRooms] = useState<IRoom[]>([]);
	const booking = useBookingStore((state) => state.booking);
	const { pagination, onPagination, setPagination } = usePagination({
		page: 0,
		pageSize: 5,
	});

	useEffect(() => {
		getRooms();
	}, [booking, pagination.page, pagination.pageSize]);

	async function getRooms() {
		if (!booking.checkOut || !booking.checkIn) return;

		const response = await roomService.searchRoom({
			data: booking,
			page: pagination.page,
			pageSize: pagination.pageSize,
		});

		if (response.items) {
			setRooms(response?.items);
			setPagination(response?.pagination);
		}
	}

	return (
		<Stack gap={4} alignItems="center">
			<PaginationBar pagination={pagination} onPagination={onPagination} />
			{rooms.length > 0 ? (
				rooms?.map((room) => {
					return <RoomCard key={room.id} {...room} />;
				})
			) : (
				<Typography variant="h5" component="p">
					Actualiza tu busqueda para obtener resultados
				</Typography>
			)}
			{/* Drawer */}
			<PaginationBar pagination={pagination} onPagination={onPagination} />
		</Stack>
	);
};

export default CardContainer;
