export interface IServiceResponse {
	status: boolean;
	data: IServices[];
}

export interface IServices {
	id: number;
	name: string;
}
