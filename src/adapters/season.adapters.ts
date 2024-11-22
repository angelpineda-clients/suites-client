import { monthsES } from "@/constants/dates";
import { ISeasonResponse } from "@/interfaces";
import { ISeason } from "@/interfaces/models";
import { parse, format } from "date-fns";

export function adapterSeason(seasons: ISeasonResponse[]): ISeason[] {
	const data = seasons.map((season) => {
		return {
			id: season.id,
			name: season.name,
			alias: season.alias,
			initialDate: season.initial_date, // mm/dd
			finalDate: season.final_date, // mm/dd
			initialText: generateDateText(season.initial_date),
			finalText: generateDateText(season.final_date),
		};
	});

	return data;
}

function generateDateText(value: Date | string) {
	const date = parse(value, "yyyy-MM-dd", new Date());

	return `${date.getDate()} de ${monthsES[Number(date.getMonth())]}`;
}
