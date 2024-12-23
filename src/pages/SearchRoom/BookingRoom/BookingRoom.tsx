import { useEffect, useState } from "react";

import { Button, Stack, Typography } from "@mui/material";

import { useBookingStore } from "@/store/booking";

import FormCalendar from "@/components/FormCalendar/FormCalendar";

import generateDateFromText from "@/utils/generateTextFromDate";

import { bookingService } from "@/services/booking.service";

import { IRoom } from "@/interfaces/models/IRoom";
import { roomService } from "@/services/room.service";
import formatNumberToPesosMX from "@/helpers/currencyFormat";
import { generateDaysFromInterval, parseDateToMonthDay } from "@/helpers/dates";
import { IDateRange } from "@/components/FormCalendar/interfaces/IFormCalendar";
import { formatToCurrency } from "@/utils/FormatToCurrency";

interface Props {
	room: IRoom;
}

interface ISeasonPrices {
	day: string;
	price: string;
}

const BookingRoom = ({ room }: Props) => {
	const booking = useBookingStore((state) => state.booking);
	const setBooking = useBookingStore((state) => state.setBooking);
	const [disabledDates, setDisabledDates] = useState<Date[]>([]);
	const [basePrice, setBasePrice] = useState<number>(room.price || 0);
	const [seasonPrices, setSeasonPrices] = useState<ISeasonPrices[]>([]);
	const [total, setTotal] = useState("");

	// todo: post to book a room

	useEffect(() => {
		if (room?.id) {
			getTakenDates();
			getPricesBySeason();
		}
	}, [room.id]);

	useEffect(() => {
		getTotal();
	}, [booking]);

	/**
	 * getTakenDates
	 * fetch booked dates by room
	 */
	async function getTakenDates() {
		const data = await bookingService.takenDates(room.id);
		setDisabledDates(data);
	}

	function handleDatesChange(data: IDateRange) {
		const { start, end } = data;

		if (start && end) {
			setBooking({
				...booking,
				check_in: start,
				check_out: end,
			});
		}
	}

	function getTotal() {
		let total = 0;
		const { checkIn, checkOut } = booking;

		const days = generateDaysFromInterval(checkIn, checkOut);

		days.forEach((date) => {
			const parsedDate = parseDateToMonthDay(date);
			const isSeason = seasonPrices.find((date) => date.day == parsedDate);

			if (isSeason?.price) {
				total += Number(isSeason.price);
			} else {
				total += basePrice;
			}
		});

		setTotal(formatToCurrency(total));
	}

	async function getPricesBySeason() {
		const response = await roomService.prices(room?.id);
		const dayWithPrices: ISeasonPrices[] = [];

		setBasePrice(response.price || room?.price);

		response.prices.map((price) => {
			const { start, end } = price;

			const days = generateDaysFromInterval(start, end);

			days.forEach((date) => {
				const currency = formatNumberToPesosMX.format(price.amount);

				dayWithPrices.push({ day: parseDateToMonthDay(date), price: currency });
			});
		});

		setSeasonPrices(dayWithPrices);
	}

	function createDayContentForCalendar(day: number, date: Date) {
		const dateParsed = parseDateToMonthDay(date);

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
				dates={{ start: booking.checkIn, end: booking.checkOut }}
				excludeDates={disabledDates}
				renderDayContents={createDayContentForCalendar}
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
					Total: {total}
				</Typography>

				<Button variant="contained">Pagar</Button>
			</Stack>
		</Stack>
	);
};

export default BookingRoom;
