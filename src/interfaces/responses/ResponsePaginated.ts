export interface ResponsePaginated<T> {
	success: boolean;
	data: Data<T>;
	message: string;
}

export interface Data<T> {
	items: T[];
	pagination: PaginationResponse;
}

export interface PaginationResponse {
	total: number;
	per_page: number;
	current_page: number;
	last_page: number;
	from: number;
	to: number;
}
