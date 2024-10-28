export interface IMeResponse {
	status: string;
	result: Result;
}

export interface Result {
	uuid: string;
	email: string;
	stores: Store[];
	username: string;
}

export interface Store {
	uuid: string;
	name: string;
	availabilityState: string;
	providers: any[];
	config: Config;
	secret: string;
	legacyId: null;
	organizationUuid: string;
}

export interface Config {
	brandColor: string;
}
