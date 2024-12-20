export interface IRoomPrice {
	price: number;
	prices: Price[];
}

export interface Price {
	priceID: number;
	seasonID: number;
	amount: number;
	seasonName: string;
	seasonAlias: string;
	start: string;
	end: string;
}
