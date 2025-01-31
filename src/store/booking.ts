import { TypeDate } from "@/components/FormCalendar/interfaces/IFormCalendar";
import { handleLocalStorage } from "@/helpers/handleLocalStorage";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface IStoreBooking {
	checkIn: TypeDate;
	checkOut: TypeDate;
	adults: string;
	children: string;
	roomID?: string;
}

export interface IBookingCustomer {
	name: string;
	lastName: string;
	phoneNumber: string;
	email: string;
}

interface IBookingStore {
	booking: IStoreBooking;
	setBooking: (data: IStoreBooking) => void;
	setRoomID: (id: string) => void;
	setCustomer: (data: IBookingCustomer) => void;
}

export const useBookingStore = create<IBookingStore>()(
	devtools((set) => ({
		booking: {
			checkIn: null,
			checkOut: null,
			adults: "2",
			children: "0",
		},
		customer: {
			name: "",
			lastName: "",
			phoneNumber: "",
			email: "",
		},
		setBooking: (data: IStoreBooking) => {
			const { checkIn, checkOut, adults, children } = data;

			const newBooking = {
				checkIn,
				checkOut,
				adults,
				children,
			};

			set((state) => {
				handleLocalStorage.setItem("booking", {
					...state.booking,
					...newBooking,
				});

				return {
					...state,
					booking: {
						...state.booking,
						...newBooking,
					},
				};
			});
		},
		setRoomID: (id: string) => {
			set((state) => {
				handleLocalStorage.setItem("booking", {
					...state.booking,
					roomID: id,
				});

				return {
					...state,
					booking: {
						...state.booking,
						roomID: id,
					},
				};
			});
		},
		setCustomer: (data: IBookingCustomer) => {
			handleLocalStorage.setItem("customer", data);

			set((state) => {
				return {
					...state,
					customer: data,
				};
			});
		},
	}))
);
