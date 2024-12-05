import axios from "axios";

import { IPagination } from "@/interfaces";
import { IPrice } from "@/interfaces/models";
import { PaginatedData } from "@/interfaces/IPagination";
import { IPriceResponse } from "@/interfaces/IPriceResponse";
import { ResponsePaginated } from "@/interfaces/responses/ResponsePaginated";

import priceSeasonAdapter from "@/adapters/price_season.adapter";
import { adapterPagination } from "@/adapters/pagination.adapter";

export interface IPriceData {
	id?: number;
	room_id?: number;
	season_id?: number;
	amount: number;
}

const priceService = {
	create: async ({
		data,
		page = 0,
		pageSize = 10,
	}: IPagination & { data: IPriceData }): Promise<PaginatedData<IPrice>> => {
		try {
			const response: ResponsePaginated<IPriceResponse> = await axios.post(
				`/price?page=${page + 1}&per_page=${pageSize}`,
				{
					...data,
				}
			);

			if (!response.success) {
				throw new Error("Error al obtener el precio creado.");
			}

			const items = priceSeasonAdapter(response.data.items);
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error) {
			return {} as PaginatedData<IPrice>;
		}
	},
	getAll: async ({
		roomID,
		page = 0,
		pageSize = 10,
	}: IPagination & { roomID: string }): Promise<PaginatedData<IPrice>> => {
		try {
			const response: ResponsePaginated<IPriceResponse> = await axios.get(
				`/price?room_id=${roomID}&page=${page + 1}&per_page=${pageSize}`
			);

			if (!response?.success) {
				throw new Error("Error al obtener el piso creado.");
			}

			const items = priceSeasonAdapter(response.data.items);
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error) {
			return {} as PaginatedData<IPrice>;
		}
	},
	update: async ({
		id,
		data,
		page = 0,
		pageSize = 10,
	}: IPagination & { id?: number; data: IPriceData }): Promise<
		PaginatedData<IPrice>
	> => {
		if (!id) {
			throw new Error("No ID to update in price");
		}

		try {
			const response: ResponsePaginated<IPriceResponse> = await axios.put(
				`/price/${id}?page=${page + 1}&per_page=${pageSize}`,
				{
					...data,
				}
			);

			if (!response?.success) {
				throw new Error("Error al obtener el piso creado.");
			}

			const items = priceSeasonAdapter(response.data.items);
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error) {
			return {} as PaginatedData<IPrice>;
		}
	},
	remove: async ({
		id,
		page = 0,
		pageSize = 10,
	}: IPagination & { id: string }): Promise<PaginatedData<IPrice>> => {
		try {
			const response: ResponsePaginated<IPriceResponse> = await axios.delete(
				`/price/${id}?page=${page + 1}&per_page=${pageSize}`
			);

			if (!response?.success) {
				throw new Error("Error al obtener el piso eliminado.");
			}

			const items = priceSeasonAdapter(response.data.items);
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error) {
			return {} as PaginatedData<IPrice>;
		}
	},
};

export { priceService };
