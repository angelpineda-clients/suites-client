import { useEffect, useState } from "react";

import { Container, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { roomService } from "@/services/room.service";

import { IRoomResponse } from "@/interfaces/IRoomResponse";

import FormConfirmBooking from "./components/FormConfirmBooking";
import ImageCarousel from "@/components/ImageCarousel/CardImages";

const ConfirmBooking = () => {
	const [params] = useSearchParams();
	const [room, setRoom] = useState<IRoomResponse>({} as IRoomResponse);

	useEffect(() => {
		getParams();
	}, [params]);

	async function getParams() {
		const roomID = params.get("room_id");

		if (roomID) {
			const room = await roomService.show(roomID);

			setRoom(room);
		}
	}

	return (
		<Container sx={{ marginY: 4 }}>
			<Typography variant="h2" component="h2" marginY={2}>
				{room.name}
			</Typography>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Container sx={{ width: "50%" }}>
					<ImageCarousel images={room.images} roomName={room.name} />
				</Container>
				<Container sx={{ width: "50%" }}>
					<FormConfirmBooking />
				</Container>
			</Stack>
		</Container>
	);
};

export default ConfirmBooking;
