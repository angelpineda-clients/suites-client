import { monthsES } from "@/constants/dates";
import { parse } from "date-fns";

function generateDateFromText(value: string | null) {
	if (!value) return "";

	const date = parse(value, "yyyy-MM-dd", new Date());

	return `${date.getDate()} de ${monthsES[Number(date.getMonth())]}`;
}

export default generateDateFromText;
