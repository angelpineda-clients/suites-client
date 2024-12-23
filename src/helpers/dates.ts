import { TypeDate } from "@/components/FormCalendar/interfaces/IFormCalendar";
import { eachDayOfInterval, getDate, getMonth, parse } from "date-fns";

function generateDaysFromInterval(startDate: TypeDate, endDate: TypeDate) {
	const start = startDate ? parse(startDate, "yyyy-MM-dd", new Date()) : null;
	const end = endDate ? parse(endDate, "yyyy-MM-dd", new Date()) : null;

	let days: Date[] = [];

	if (start && end) {
		days = eachDayOfInterval({ start, end });
	}

	return days;
}

function parseDateToMonthDay(date: Date) {
	const dayNumber = getDate(date);
	const month = getMonth(date);

	const dateParsed = `${month}-${dayNumber}`;

	return dateParsed;
}

export { generateDaysFromInterval, parseDateToMonthDay };
