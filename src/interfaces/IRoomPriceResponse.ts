export interface IRoomPriceResponse {
	id: number;
	name: string;
	price: number;
	prices: Price[];
}

export interface Price {
	id: number;
	room_id: number;
	amount: number;
	season_id: number;
	season: Season;
}

export interface Season {
	id: number;
	name: string;
	alias: string;
	initial_date: Date;
	final_date: Date;
}
