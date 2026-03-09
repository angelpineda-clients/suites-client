import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
import {
  CalendarDay,
  CartRoot,
  CloseRow,
  ConfirmButton,
  DayNumber,
  DayPrice,
  LabelText,
  TotalText,
} from "./Cart.styled";

interface Props {
  room: IRoom;
  closeDrawer?: () => void;
}

interface ISeasonPrices {
  day: string;
  price: number;
}

const Cart = ({ room, closeDrawer }: Props) => {
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
    const data = await bookingService.takenDates(Number(room.id));
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
        checkIn: start,
        checkOut: end,
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
    const response = await roomService.prices(Number(room?.id));
    const dayWithPrices: ISeasonPrices[] = [];

    setBasePrice(response.price || room?.price);

    response?.prices.map((price) => {
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
    const price = isSeasonDate ? isSeasonDate.price : basePrice;

    return (
      <CalendarDay>
        <DayNumber variant="body2" component="span">
          {day}
        </DayNumber>
        <DayPrice variant="caption" component="span">
          {formatNumberToPesosMX.format(price)}
        </DayPrice>
      </CalendarDay>
    );
  }

  function handleConfirmNavigation() {
    navigate(`/confirm-booking?room_id=${room.id}`);
    return closeDrawer?.();
  }

  return (
    <CartRoot>
      <CloseRow>
        <ConfirmButton onClick={closeDrawer} variant="outlined" color="error">
          <CloseIcon />
        </ConfirmButton>
      </CloseRow>
      <FormCalendar
        handleChange={handleDatesChange}
        dates={{ start: booking.checkIn, end: booking.checkOut }}
        excludeDates={disabledDates}
        renderDayContents={createDayContentForCalendar}
      />

      <Stack gap={1}>
        <Typography variant="subtitle2">
          <LabelText component="span">Entrada:</LabelText> {generateDateFromText(booking.checkIn)}
        </Typography>
        <Typography variant="subtitle2">
          <LabelText component="span">Salida:</LabelText> {generateDateFromText(booking.checkOut)}
        </Typography>
      </Stack>

      <Stack>
        <Typography variant="h6" component="h6">
          {room?.name}
        </Typography>

        <CardImages images={room.images} roomName={room.name} />
      </Stack>

      <Stack textAlign="center">
        <TotalText variant="h5" component="h4">
          Total: {total}
        </TotalText>

        <ConfirmButton variant="outlined" onClick={handleConfirmNavigation}>
          Confirmar
        </ConfirmButton>
      </Stack>
    </CartRoot>
  );
};

export default Cart;
