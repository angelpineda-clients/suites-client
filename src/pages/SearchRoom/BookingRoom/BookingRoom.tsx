import { useEffect, useState } from "react";

import { IRoom } from "@/interfaces/models/IRoom";
import { useBookingStore } from "@/store/booking";
import { Button, Stack, Typography } from "@mui/material";
import FormCalendar from "@/components/FormCalendar/FormCalendar";
import generateDateFromText from "@/utils/generateTextFromDate";
import axios from "axios";
import { format, parse } from "date-fns";

interface Props {
	room: IRoom;
}

const BookingRoom = ({ room }: Props) => {
	const booking = useBookingStore((state) => state.booking);
	const [disabledDates, setDisabledDates] = useState<Date[]>([]);

	// todo: show calendar with disabled dates
	// todo: call roomTakenDates
	// todo: post to book a room

	useEffect(() => {
		getTakenDates();
	}, [room.id]);

	function getTakenDates() {
		console.log(room.id);
		axios.get(`booking-unavailable-dates/${room.id}`).then((resp) => {
			const dates = resp.map((date) => parse(date, "yyyy-MM-dd", new Date()));

			setDisabledDates(dates);
		});
	}

	function handleChange(data) {
		console.log(data);
	}

	function generatePrice() {
		return room.price;
	}

	return (
		<Stack
			sx={{
				padding: "20px",
				width: "450px",
				textAlign: "center",
			}}
			gap={4}
		>
			<FormCalendar
				handleChange={handleChange}
				dates={{ initial: booking.checkIn, final: booking.checkOut }}
				excludeDates={disabledDates}
			/>

			<Stack gap={1}>
				<Typography variant="subtitle2">
					<strong>Entrada:</strong> {generateDateFromText(booking.checkIn)}
				</Typography>
				<Typography variant="subtitle2">
					<strong>Salida:</strong> {generateDateFromText(booking.checkOut)}
				</Typography>
			</Stack>

			<Stack>
				<Typography variant="h6" component="h6">
					{room.name}
				</Typography>
				<img src={room.images[0]?.url} alt={room.name} />
			</Stack>

			<Stack textAlign="center">
				<Typography
					variant="h5"
					component="h4"
					sx={{
						marginBottom: "16px",
					}}
				>
					Total:{generatePrice()}
				</Typography>

				<Button variant="contained">Pagar</Button>
			</Stack>
		</Stack>
	);
};

export default BookingRoom;
