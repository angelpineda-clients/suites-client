/* Libraries */
import axios from "axios";
import { toast } from "react-toastify";
/* Interfaces */
import { ISize } from "@/interfaces/models";
import { IPagination, PaginatedData } from "@/interfaces/IPagination";
import { ResponsePaginated } from "@/interfaces/responses/ResponsePaginated";
import { adapterPagination } from "@/adapters/pagination.adapter";

const sizeService = {
	create: async ({
		size,
		page = 0,
		pageSize = 10,
	}: IPagination & { size: ISize }): Promise<PaginatedData<ISize> | null> => {
		try {
			const response: ResponsePaginated<ISize> = await axios.post(
				`/size?page=${page + 1}&per_page=${pageSize}`,
				{
					...size,
				}
			);

			if (!response?.success) {
				throw new Error("Error al obtener el tamaño creada.");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = response.data.items;

			return { items, pagination };
		} catch (error: any) {
			console.error(error);

			if (error instanceof Error) {
				toast.error(error.message);
			}

			return null;
		}
	},
	getAll: async ({
		page = 0,
		pageSize = 10,
	}: IPagination = {}): Promise<PaginatedData<ISize> | null> => {
		try {
			const response: ResponsePaginated<ISize> = await axios.get(
				`/size?page=${page + 1}&per_page=${pageSize}`
			);

			if (!response?.success) {
				throw new Error("Error al obtener todas los tamaños.");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = response.data.items;

			return { items, pagination };
		} catch (error: any) {
			console.error(error);

			if (error instanceof Error) {
				toast.error(error.message);
			}

			return null;
		}
	},
	update: async ({
		id,
		size,
		page = 0,
		pageSize = 10,
	}: IPagination & {
		id: number;
		size: ISize;
	}): Promise<PaginatedData<ISize> | null> => {
		try {
			const response: ResponsePaginated<ISize> = await axios.put(
				`/size/${id}?page=${page + 1}&per_page=${pageSize}`,
				{
					...size,
				}
			);

			if (!response.success) {
				throw new Error("Error al obtener el tamaño actualizado");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = response.data.items;

			return { items, pagination };
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				toast.error(error.message);
			}

			return null;
		}
	},
	remove: async ({
		id,
		page = 0,
		pageSize = 10,
	}: IPagination & {
		id: number;
	}): Promise<PaginatedData<ISize> | null> => {
		try {
			const response: ResponsePaginated<ISize> = await axios.delete(
				`/size/${id}?page=${page + 1}&per_page=${pageSize}`
			);

			if (!response.success) {
				throw new Error("Error al obtener el tamaño eleminado");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = response.data.items;

			return { items, pagination };
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				toast.error(error.message);
			}

			return null;
		}
	},
};

export { sizeService };
