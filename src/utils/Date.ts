import { parse } from "date-fns";

export function formatDate(value: Date | string) {
	const date = parse(value, "yyyy-MM-dd", new Date());

	return date;
}
