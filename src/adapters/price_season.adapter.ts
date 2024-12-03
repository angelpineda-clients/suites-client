import { IPriceResponse } from "@/interfaces/IPriceResponse";
import { formatToCurrency } from "@/utils/FormatToCurrency";
import generateDateFromText from "@/utils/generateTextFromDate";

function priceSeasonAdapter(prices: IPriceResponse[]) {
	return prices.map((item) => {
		return {
			seasonName: item.season.name,
			seasonInitialDate: generateDateFromText(item.season.initial_date),
			seasonFinalDate: generateDateFromText(item.season.final_date),
			amount: formatToCurrency(item.amount),
			roomID: item.room_id,
			seasonID: item.season_id,
			id: item.id,
		};
	});
}

export default priceSeasonAdapter;
