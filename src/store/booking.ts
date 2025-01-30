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
	roomID?: string;
}

interface IBookingStore {
	booking: IStoreBooking;
	setBooking: (data: IStoreNewBooking) => void;
	setRoomID: (id: string) => void;
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
		setBooking: (data: IStoreNewBooking) => {
			const { check_in: checkIn, check_out: checkOut, adults, children } = data;

			set((state) => {
				localStorage.setItem(
					"booking",
					JSON.stringify({
						...state.booking,
						checkIn,
						checkOut,
						adults,
						children,
					})
				);

				return {
					...state,
					booking: {
						...state.booking,
						checkIn,
						checkOut,
						adults,
						children,
					},
				};
			});
		},
		setRoomID: (id: string) => {
			set((state) => {
				localStorage.setItem(
					"booking",
					JSON.stringify({
						...state.booking,
						roomID: id,
					})
				);

				return {
					...state,
					booking: {
						...state.booking,
						roomID: id,
					},
				};
			});
		},
		setCustomer: (data: any) => {
			set((state) => {
				return {
					...state,
				};
			});
		},
	}))
);
