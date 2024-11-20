export interface IPagination {
	pageSize?: number;
	page?: number;
}

export interface PaginatedData<T> {
	items: T[];
	pagination: Pagination;
}

export interface Pagination {
	page: number;
	pageSize: number;
	total: number;
	lastPage: number;
	from: number;
	to: number;
}
