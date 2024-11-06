import { IService } from "./models";

export interface ServiceResponse {
	response: Response;
}

export interface Response {
	status: boolean;
	data: IService[];
}
