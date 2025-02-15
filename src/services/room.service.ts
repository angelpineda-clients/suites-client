import axios from "axios";
import { toast } from "react-toastify";

import { adapterPagination } from "@/adapters/pagination.adapter";
import { adapterRoom } from "@/adapters/room.adapter";

import { IPagination } from "@/interfaces";
import { PaginatedData } from "@/interfaces/IPagination";
import { IRoomResponse } from "@/interfaces/IRoomResponse";
import { IRoom } from "@/interfaces/models/IRoom";
import { ResponsePaginated } from "@/interfaces/responses/ResponsePaginated";
import { ApiResponse } from "@/interfaces/responses/ApiResponse";
import { IRoomPriceResponse } from "@/interfaces/IRoomPriceResponse";
import { IRoomPrice } from "@/interfaces/IRoomPrice";

const roomService = {
	create: async ({
		room,
		pageSize = 10,
		page = 0,
	}: IPagination & {
		room: IRoom;
	}): Promise<PaginatedData<IRoom> | null> => {
		try {
			const response: ResponsePaginated<IRoomResponse> = await axios.post(
				`/room?per_page=${pageSize}&page=${page + 1}`,
				{ ...room },
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);

			if (!response?.success) {
				throw new Error("Error al obtener el cuarto creado.");
			}

			const items = adapterRoom(response.data.items);
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
		pageSize = 10,
		page = 0,
	}: IPagination): Promise<PaginatedData<IRoom> | null> => {
		try {
			const response: ResponsePaginated<IRoomResponse> = await axios.get(
				`/room?per_page=${pageSize}&page=${page + 1}`
			);

			if (!response?.success) {
				throw new Error("Error al obtener el cuarto creado.");
			}

			const items = adapterRoom(response.data.items);
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
	show: async (id: string): Promise<IRoomResponse> => {
		try {
			const response: {
				success: boolean;
				data: IRoomResponse;
				message: string;
			} = await axios.get(`/room/${id}`);

			if (!response?.success) {
				throw new Error("Error al obtener el cuarto creado.");
			}

			return response.data;
		} catch (error: any) {
			console.error(error);
			if (error instanceof Error) {
				toast.error(error?.message);
			}

			return {} as IRoomResponse;
		}
	},
	update: async ({
		id,
		room,
	}: {
		id: string;
		room: IRoom;
	}): Promise<IRoomResponse> => {
		try {
			const response: {
				success: boolean;
				data: IRoomResponse;
				message: string;
			} = await axios.put(`/room/${id}`, {
				...room,
			});

			if (!response?.success) {
				throw new Error("Error al obtener el cuarto creado.");
			}

			return response.data;
		} catch (error: any) {
			console.error(error);
			if (error instanceof Error) {
				toast.error(error?.message);
			}

			return {} as IRoomResponse;
		}
	},
	remove: async ({
		id,
		pageSize = 10,
		page = 0,
	}: IPagination & {
		id: number;
	}): Promise<PaginatedData<IRoom> | null> => {
		try {
			const response: ResponsePaginated<IRoomResponse> = await axios.delete(
				`/room/${id}?per_page=${pageSize}&page=${page + 1}`
			);

			if (!response?.success) {
				throw new Error("Error al obtener el cuarto creado.");
			}

			const items = adapterRoom(response.data.items);
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
	searchRoom: async ({
		data,
		page = 0,
		pageSize = 10,
	}: IPagination & { data: any }): Promise<PaginatedData<IRoom>> => {
		try {
			const response: ResponsePaginated<any> = await axios.get(
				`/search?page=${page + 1}&per_page=${pageSize}&check_in=${data?.checkIn}&check_out=${data.checkOut}&adults=${data.adults}&children=${data.children}`
			);

			if (!response.success) {
				throw new Error("Error al obtener la busqueda de cuartos.");
			}

			const items = response.data.items;
			const pagination = adapterPagination(response.data.pagination);

			return { items, pagination };
		} catch (error) {
			console.error(error);

			return {} as PaginatedData<IRoom>;
		}
	},
	prices: async (roomID: number): Promise<IRoomPrice> => {
		try {
			const response: ApiResponse<IRoomPriceResponse> = await axios.get(
				`/room-prices/${roomID}`
			);

			if (!response.success) {
				throw new Error("Error al obtener la busqueda de cuartos.");
			}

			const data = adapterRoomPrice(response.data);

			return data;
		} catch (error) {
			console.error(error);

			return {} as IRoomPrice;
		}
	},
};

function adapterRoomPrice(data: IRoomPriceResponse) {
	const price = data.price || 0;

	const prices = data.prices.map((price) => {
		const { season } = price;

		return {
			priceID: price?.id,
			seasonID: season?.id,
			amount: price?.amount || 0,
			seasonName: season.name || price.season.alias || "No season name",
			seasonAlias: season?.alias || "",
			start: season.initial_date || "no date",
			end: season.final_date || "no date",
		};
	});

	return { price, prices };
}

export { roomService };
