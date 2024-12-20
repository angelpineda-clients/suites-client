import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface IStoreNewBooking {
	check_in: string | undefined;
	check_out: string | undefined;
	adults: string;
	children: string;
}

export interface IStoreBooking {
	checkIn: string | null;
	checkOut: string | null;
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
