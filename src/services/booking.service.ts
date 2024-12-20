import axios from "axios";
import { parse } from "date-fns";

const bookingService = {
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
