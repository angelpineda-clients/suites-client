/* Libraries */
import axios from "axios";
/* interfaces */
import { IPagination } from "@/interfaces";
import { IService } from "@/interfaces/models";
import { ResponsePaginated } from "@/interfaces/responses/ResponsePaginated";
import { PaginatedData } from "@/interfaces/IPagination";
import { adapterPagination } from "@/adapters/pagination.adapter";
import { toast } from "react-toastify";

const serviceService = {
	create: async ({
		service,
		pageSize = 10,
		page = 0,
	}: IPagination & {
		service: IService;
	}): Promise<PaginatedData<IService> | null> => {
		try {
			const response: ResponsePaginated<IService> = await axios.post(
				`/service?per_page=${pageSize}&page=${page + 1}`,
				{
					...service,
				}
			);

			if (!response.success) {
				throw new Error("Error al obtener los servicios creados.");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = response.data.items || [];

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
		pageSize = 10,
		page = 0,
	}: IPagination = {}): Promise<PaginatedData<IService> | null> => {
		try {
			const response: ResponsePaginated<IService> = await axios.get(
				`/service?per_page=${pageSize}&page=${page + 1}`
			);

			if (!response.success) {
				throw new Error("Error al obtener todos los servicios.");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = response.data.items;

			return { items, pagination };
		} catch (error: any) {
			console.error(error?.message);

			if (error instanceof Error) {
				toast.error(error.message);
			}

			return null;
		}
	},

	update: async ({
		id,
		service,
		pageSize = 10,
		page = 0,
	}: IPagination & {
		id: number;
		service: IService;
	}): Promise<PaginatedData<IService> | null> => {
		try {
			const response: ResponsePaginated<IService> = await axios.put(
				`/service/${id}?per_page=${pageSize}&page=${page + 1}`,
				{
					...service,
				}
			);

			if (!response) {
				throw new Error("Error al obtener el servicio actualizado");
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

	remove: async ({
		id,
		pageSize = 10,
		page = 0,
	}: IPagination & { id: number }): Promise<PaginatedData<IService> | null> => {
		try {
			if (!id) {
				throw new Error("ID no encontrado, contacte a soporte.");
			}

			const response: ResponsePaginated<IService> = await axios.delete(
				`/service/${id}?per_page=${pageSize}&page=${page + 1}`
			);

			if (!response) {
				throw new Error("Error al obtener el servicio eliminado");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = response.data.items;

			return { items, pagination };
		} catch (error: unknown) {
			console.error(error);

			if (error instanceof Error) {
				toast.error(error.message);
			}

			return null;
		}
	},
};

export { serviceService };
