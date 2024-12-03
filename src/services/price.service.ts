import axios from "axios";

import priceSeasonAdapter from "@/adapters/price_season.adapter";

import { IPriceResponse } from "@/interfaces/IPriceResponse";

import { ResponsePaginated } from "@/interfaces/responses/ResponsePaginated";
import { IPagination } from "@/interfaces";
import { adapterPagination } from "@/adapters/pagination.adapter";

const priceService = {
	create: async ({
		data, // amount, room_id, season_id,
		page = 0,
		pageSize = 10,
	}: IPagination & { data: any }) => {
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
			return {};
		}
	},
	getAll: async ({
		roomID,
		page = 0,
		pageSize = 10,
	}: IPagination & { roomID: string }) => {
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
			return [];
		}
	},
	update: async ({
		id,
		data, // amount,
		page = 0,
		pageSize = 10,
	}: IPagination & { id: string; data: any }) => {
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

			console.log(response);

			if (!response?.success) {
				throw new Error("Error al obtener el piso creado.");
			}

			const items = priceSeasonAdapter(response.data.items);
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error) {
			return [];
		}
	},
	remove: async ({
		id,
		page = 0,
		pageSize = 10,
	}: IPagination & { id: string }) => {
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
			return {};
		}
	},
};

export { priceService };
