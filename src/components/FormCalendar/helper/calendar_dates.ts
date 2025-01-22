import { parse } from "date-fns";
import { IDateRange } from "../interfaces/IFormCalendar";

export type DateRange = Date | null;

function generateDateRange({ start, end }: IDateRange): DateRange[] {
	const initialDate = start ? parse(start, "yyyy-MM-dd", new Date()) : null;
	const finalDate = end ? parse(end, "yyyy-MM-dd", new Date()) : null;

	return [initialDate, finalDate];
}

export { generateDateRange };
