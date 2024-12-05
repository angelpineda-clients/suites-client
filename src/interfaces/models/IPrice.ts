export interface IPrice {
	id: number;
	roomID: number;
	seasonID: number;
	amount: number | string;
	seasonName: string;
	seasonFinalDate: string;
	seasonInitialDate: string;
}
