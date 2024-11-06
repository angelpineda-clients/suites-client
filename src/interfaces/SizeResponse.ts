import { ISize } from "./models/ISize";

export interface SizeResponse {
	response: Response;
}

export interface Response {
	status: boolean;
	data: ISize[];
}
