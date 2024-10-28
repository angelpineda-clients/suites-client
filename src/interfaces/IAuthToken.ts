export interface IAuth {
	data: Data;
}

export interface Data {
	auth: Auth;
	user: User;
}

export interface Auth {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
}

export interface User {
	id: number;
	name: string;
	email: string;
}
