import { TypeDate } from "@/components/FormCalendar/interfaces/IFormCalendar";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface IStoreNewBooking {
	check_in: TypeDate;
	check_out: TypeDate;
	adults: string;
	children: string;
}

export interface IStoreBooking {
	checkIn: TypeDate;
	checkOut: TypeDate;
	adults: string;
	children: string;
}

interface IBookingStore {
	booking: IStoreBooking;
	setBooking: (data: IStoreNewBooking) => void;
}

export const useBookingStore = create<IBookingStore>()(
	devtools((set) => ({
		booking: {
			checkIn: null,
			checkOut: null,
			adults: "2",
			children: "0",
		},
		setBooking: (data: IStoreNewBooking) => {
			const { check_in, check_out, adults, children } = data;

			set({
				booking: {
					checkIn: check_in,
					checkOut: check_out,
					adults,
					children,
				},
			});
		},
	}))
);
