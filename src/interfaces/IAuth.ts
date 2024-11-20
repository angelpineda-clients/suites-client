import { IUser } from "./models/IUser";

export interface IAuth {
	data: Data;
}

export interface Data {
	auth: Auth;
	user: IUser;
}

export interface Auth {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
}
