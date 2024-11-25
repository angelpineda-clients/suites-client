import { Pagination } from "@/interfaces/IPagination";
import { PaginationResponse } from "@/interfaces/responses/ResponsePaginated";

export function adapterPagination(pagination?: PaginationResponse): Pagination {
	return {
		total: pagination?.total || 0,
		pageSize: pagination?.per_page || 5,
		page: pagination?.current_page ? pagination?.current_page - 1 : 0,
		lastPage: pagination?.last_page || 0,
		from: pagination?.from || 0,
		to: pagination?.to || 0,
	};
}
