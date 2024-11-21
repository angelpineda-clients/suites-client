/* Libraries */
import axios from "axios";
/* Interfaces */
import { IFloor } from "@/interfaces/models";
import { toast } from "react-toastify";
import { ResponsePaginated } from "@/interfaces/responses/ResponsePaginated";
import { adapterPagination } from "@/adapters/pagination.adapter";
import { IPagination, PaginatedData } from "@/interfaces/IPagination";

const floorService = {
	create: async ({
		floor,
		pageSize = 10,
		page = 0,
	}: IPagination & {
		floor: IFloor;
	}): Promise<PaginatedData<IFloor> | null> => {
		try {
			const response: ResponsePaginated<IFloor> = await axios.post(
				`/floor?per_page=${pageSize}&page=${page + 1}`,
				{
					...floor,
				}
			);

			if (!response?.success) {
				throw new Error("Error al obtener el piso creado.");
			}

			const items = response.data.items;
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error: any) {
			console.error(error);
			if (error instanceof Error) {
				toast.error(error?.message);
			}

			return null;
		}
	},
	getAll: async ({
		page = 0,
		pageSize = 10,
	}: IPagination = {}): Promise<PaginatedData<IFloor> | null> => {
		try {
			const response: ResponsePaginated<IFloor> = await axios.get(
				`/floor?per_page=${pageSize}&page=${page + 1}`
			);

			if (!response.success) {
				throw new Error("Error al obtener todos los pisos.");
			}

			const items = response.data.items;
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error: any) {
			console.error(error);
			if (error instanceof Error) {
				toast.error(error?.message);
			}

			return null;
		}
	},

	update: async ({
		id,
		floor,
		page = 0,
		pageSize = 10,
	}: IPagination & {
		id: number;
		floor: IFloor;
	}): Promise<PaginatedData<IFloor> | null> => {
		try {
			const response: ResponsePaginated<IFloor> = await axios.put(
				`/floor/${id}?per_page=${pageSize}&page=${page + 1}`,
				{
					...floor,
				}
			);

			if (!response) {
				throw new Error("Error al obtener el piso actualizado");
			}

			const items = response.data.items;
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				toast.error(error?.message);
			}

			return null;
		}
	},
	remove: async ({
		id,
		page = 0,
		pageSize = 10,
	}: IPagination & { id: number }): Promise<PaginatedData<IFloor> | null> => {
		try {
			const response: ResponsePaginated<IFloor> = await axios.delete(
				`/floor/${id}?per_page=${pageSize}&page=${page + 1}`
			);

			if (!response) {
				throw new Error("Error al obtener el piso eleminado");
			}

			const items = response.data.items;
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				toast.error(error?.message);
			}

			return null;
		}
	},
};

export { floorService };
