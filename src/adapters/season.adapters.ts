import { ISeasonResponse } from "@/interfaces";
import { ISeason } from "@/interfaces/models";
import generateDateFromText from "@/utils/generateTextFromDate";

export function adapterSeason(seasons: ISeasonResponse[]): ISeason[] {
	const data = seasons.map((season) => {
		return {
			id: season.id,
			name: season.name,
			alias: season.alias,
			initialDate: season.initial_date, // mm/dd
			finalDate: season.final_date, // mm/dd
			initialText: generateDateFromText(season.initial_date),
			finalText: generateDateFromText(season.final_date),
		};
	});

	return data;
}
