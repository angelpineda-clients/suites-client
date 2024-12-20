import { useEffect, useState } from "react";

import { Button, Stack, Typography } from "@mui/material";

import { useBookingStore } from "@/store/booking";

import FormCalendar, {
	IDateRange,
} from "@/components/FormCalendar/FormCalendar";

import generateDateFromText from "@/utils/generateTextFromDate";

import { bookingService } from "@/services/booking.service";

import { IRoom } from "@/interfaces/models/IRoom";
import { roomService } from "@/services/room.service";
import { eachDayOfInterval, parse, getDate, getMonth } from "date-fns";
import formatNumberToPesosMX from "@/helpers/currencyFormat";

interface Props {
	room: IRoom;
}

interface ISeasonPrices {
	day: string;
	price: string;
}

const BookingRoom = ({ room }: Props) => {
	const booking = useBookingStore((state) => state.booking);
	const [disabledDates, setDisabledDates] = useState<Date[]>([]);
	const [basePrice, setBasePrice] = useState<number>(room.price || 0);
	const [seasonPrices, setSeasonPrices] = useState<ISeasonPrices[]>([]);

	// todo: show prices by day
	// todo: post to book a room

	useEffect(() => {
		if (room?.id) {
			getTakenDates();
			getPricesBySeason();
		}
	}, [room.id]);

	async function getTakenDates() {
		const data = await bookingService.takenDates(room.id);

		setDisabledDates(data);
	}

	function handleDatesChange(data: IDateRange) {
		console.log(data);
	}

	function getTotal() {
		return room.price;
	}

	async function getPricesBySeason() {
		const response = await roomService.prices(room?.id);
		const dayWithPrices: ISeasonPrices[] = [];
		setBasePrice(response.price || room?.price);

		response.prices.map((price) => {
			const start = parse(price.start, "yyyy-MM-dd", new Date());
			const end = parse(price.end, "yyyy-MM-dd", new Date());

			const days = eachDayOfInterval({
				start,
				end,
			});

			days.forEach((date) => {
				const day = getDate(date);
				const month = getMonth(date);
				const currency = formatNumberToPesosMX.format(price.amount);

				dayWithPrices.push({ day: `${month}-${day}`, price: currency });
			});
		});
		setSeasonPrices(dayWithPrices);
	}

	/* analysis for dates in calendar

  data: { price, prices[]: {id, amount, seasonName, start, end} }
  -> generate date from range
  -> generate array with each date and price
  -> match dates and return jsx.element with day and price

  Date[]: {day, date}

   */

	function createDayContent(day: number, date: Date) {
		const dayNumber = getDate(date);
		const month = getMonth(date);

		const dateParsed = `${month}-${dayNumber}`;

		const isSeasonDate = seasonPrices.find((date) => date.day == dateParsed);

		if (isSeasonDate) {
			return (
				<div style={{ display: "flex", flexDirection: "column" }}>
					<span style={{ height: "15px" }}>{day}</span>
					<small style={{ fontSize: "10px" }}>{isSeasonDate.price}</small>
				</div>
			);
		} else {
			return (
				<div style={{ display: "flex", flexDirection: "column" }}>
					<span style={{ height: "15px" }}>{day}</span>
					<small style={{ fontSize: "10px" }}>
						{formatNumberToPesosMX.format(basePrice)}
					</small>
				</div>
			);
		}
	}

	return (
		<Stack
			sx={{
				padding: "20px",
				width: "500px",
				textAlign: "center",
			}}
			gap={4}
		>
			<FormCalendar
				handleChange={handleDatesChange}
				dates={{ initial: booking.checkIn, final: booking.checkOut }}
				excludeDates={disabledDates}
				renderDayContents={createDayContent}
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
					Total:{getTotal()}
				</Typography>

				<Button variant="contained">Pagar</Button>
			</Stack>
		</Stack>
	);
};

export default BookingRoom;
