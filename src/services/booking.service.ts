import axios from "axios";
import { parse } from "date-fns";

interface IFormData {
	name: string;
	last_name: string;
	phone_number: string;
	email: string;
	check_in: string;
	check_out: string;
	room_id: string;
}

const bookingService = {
	store: async (data: IFormData) => {
		try {
			const response = await axios.post(`/booking`, { ...data });

			if (!response.success) {
				return new Error("Error al obtener la reserva");
			}

			return response.data;
		} catch (error) {
			console.error(error);

			return null;
		}
	},
	takenDates: async (roomID: number) => {
		const response: string[] = await axios.get(
			`booking-unavailable-dates/${roomID}`
		);

		const dates = response.map((date: string) =>
			parse(date, "yyyy-MM-dd", new Date())
		);

		return dates;
	},
};

export { bookingService };
