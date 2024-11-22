/* Libraries */
import axios from "axios";
import { toast } from "react-toastify";
/* Interfaces */
import { ISeason } from "@/interfaces/models";
import { IPagination, PaginatedData } from "@/interfaces/IPagination";
import { ResponsePaginated } from "@/interfaces/responses/ResponsePaginated";
import { adapterPagination } from "@/adapters/pagination.adapter";
import { adapterSeason } from "@/adapters/season.adapters";
import { ISeasonResponse } from "@/interfaces";

const seasonService = {
	create: async ({
		season,
		page = 0,
		pageSize = 10,
	}: IPagination & {
		season: ISeason;
	}): Promise<PaginatedData<ISeason> | null> => {
		try {
			const response: ResponsePaginated<ISeasonResponse> = await axios.post(
				`/season?page=${page + 1}&per_page=${pageSize}`,
				{
					...season,
				}
			);

			if (!response?.success) {
				throw new Error("Error al obtener la temporada creada.");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = adapterSeason(response.data.items);

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
	}: IPagination = {}): Promise<PaginatedData<ISeason> | null> => {
		try {
			const response: ResponsePaginated<ISeasonResponse> = await axios.get(
				`/season?page=${page + 1}&per_page=${pageSize}`
			);

			if (!response?.success) {
				throw new Error("Error al obtener todas las temporadas.");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = adapterSeason(response.data.items);

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
		season,
		page = 0,
		pageSize = 10,
	}: IPagination & {
		id: number;
		season: ISeason;
	}): Promise<PaginatedData<ISeason> | null> => {
		try {
			const response: ResponsePaginated<ISeasonResponse> = await axios.put(
				`/season/${id}?page=${page + 1}&per_page=${pageSize}`,
				{
					...season,
				}
			);

			if (!response) {
				throw new Error("Error al obtener la temporada actualizada");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = adapterSeason(response.data.items);

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
	}): Promise<PaginatedData<ISeason> | null> => {
		try {
			const response: ResponsePaginated<ISeasonResponse> = await axios.delete(
				`/season/${id}?page=${page + 1}&per_page=${pageSize}`
			);

			if (!response) {
				throw new Error("Error al obtener la temporada eleminada");
			}

			const pagination = adapterPagination(response.data.pagination);
			const items = adapterSeason(response.data.items);

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

export { seasonService };
