import { ISeason } from "./models/ISeason";

export interface SeasonResponse {
	response: Response;
}

export interface Response {
	status: boolean;
	data: ISeason[];
}
