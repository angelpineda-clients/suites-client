import { ISeasonResponse } from "./ISeasonResponse";

export interface IPriceResponse {
	id: number;
	amount: string;
	room_id: number;
	season_id: number;
	season: ISeasonResponse;
}
