import { useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router";
import { Button, Stack, Typography } from "@mui/material";

import { useBookingStore } from "@/store/booking";

import FormCalendar from "@/components/FormCalendar/FormCalendar";
import { IDateRange } from "@/components/FormCalendar/interfaces/IFormCalendar";

import generateDateFromText from "@/utils/generateTextFromDate";

import { roomService } from "@/services/room.service";
import { bookingService } from "@/services/booking.service";

import { IRoom } from "@/interfaces/models/IRoom";

import { formatToCurrency } from "@/utils/FormatToCurrency";

import formatNumberToPesosMX from "@/helpers/currencyFormat";
import { generateDaysFromInterval, parseDateToMonthDay } from "@/helpers/dates";
import CardImages from "@/components/ImageCarousel/CardImages";

interface Props {
	room: IRoom;
	closeDrawer: () => void;
}

interface ISeasonPrices {
	day: string;
	price: number;
}

const BookingRoom = ({ room, closeDrawer }: Props) => {
	const navigate = useNavigate();
	const booking = useBookingStore((state) => state.booking);
	const setBooking = useBookingStore((state) => state.setBooking);
	const [disabledDates, setDisabledDates] = useState<Date[]>([]);
	const [basePrice, setBasePrice] = useState<number>(room.price || 0);
	const [seasonPrices, setSeasonPrices] = useState<ISeasonPrices[]>([]);
	const [total, setTotal] = useState("");

	useEffect(() => {
		if (room?.id) {
			getTakenDates();
			getPricesBySeason();
		}
	}, [room.id]);

	useEffect(() => {
		getTotal();
	}, [booking, seasonPrices]);

	/**
	 * getTakenDates
	 * fetch booked dates by room
	 */
	async function getTakenDates() {
		const data = await bookingService.takenDates(room.id);
		setDisabledDates(data);
	}

	/**
	 * handleDatesChange
	 * set booking dates
	 * @param {IDateRange} data
	 */
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

	/**
	 * getTotal
	 * generate total price by booking getting price with season
	 * @return {*}
	 */
	function getTotal() {
		let total = 0;
		const { checkIn, checkOut } = booking;

		if (!checkIn || !checkOut || seasonPrices.length < 1) return;

		// get days array
		const days = generateDaysFromInterval(checkIn, checkOut);

		// remove check out day from array
		days.pop();

		// get price by each night
		days.forEach((date) => {
			const parsedDate = parseDateToMonthDay(date);
			const isSeason = seasonPrices.find((date) => date.day == parsedDate);

			if (isSeason) {
				total += Number(isSeason.price);
			} else {
				total += basePrice;
			}
		});

		setTotal(formatToCurrency(total));
	}

	/**
	 * getPricesBySeason
	 * fetch prices by season
	 */
	async function getPricesBySeason() {
		const response = await roomService.prices(room?.id);
		const dayWithPrices: ISeasonPrices[] = [];

		setBasePrice(response.price || room?.price);

		response.prices.map((price) => {
			const { start, end } = price;

			const days = generateDaysFromInterval(start, end);

			days.forEach((date) => {
				dayWithPrices.push({
					day: parseDateToMonthDay(date),
					price: price.amount,
				});
			});
		});

		setSeasonPrices(dayWithPrices);
	}

	/**
	 * createDayContentForCalendar
	 * render each tile in calender with price
	 * @param {number} day
	 * @param {Date} date
	 * @return {*}
	 */
	function createDayContentForCalendar(day: number, date: Date) {
		const dateParsed = parseDateToMonthDay(date);

		const isSeasonDate = seasonPrices.find((date) => date.day == dateParsed);

		if (isSeasonDate) {
			return (
				<div style={{ display: "flex", flexDirection: "column" }}>
					<span style={{ height: "15px" }}>{day}</span>
					<small style={{ fontSize: "10px" }}>
						{formatToCurrency(isSeasonDate.price)}
					</small>
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

	function handleConfirmNavigation() {
		navigate(`/confirm-booking?room_id=${room.id}`);
		return closeDrawer();
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
			<button onClick={closeDrawer}>Close</button>
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

				<CardImages images={room.images} roomName={room.name} />
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

				<Button variant="contained" onClick={handleConfirmNavigation}>
					Confirmar
				</Button>
			</Stack>
		</Stack>
	);
};

export default BookingRoom;
