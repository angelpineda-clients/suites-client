import { IFloor } from "./models/IFloor";

export interface FloorResponse {
	response: Response;
}

export interface Response {
	status: boolean;
	data: IFloor[];
}
