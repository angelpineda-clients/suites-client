import axios from "axios";
import { toast } from "react-toastify";

import { adapterPagination } from "@/adapters/pagination.adapter";
import { adapterRoom } from "@/adapters/room.adapter";

import { IPagination } from "@/interfaces";
import { PaginatedData } from "@/interfaces/IPagination";
import { IRoomResponse } from "@/interfaces/IRoomResponse";
import { IRoom } from "@/interfaces/models/IRoom";
import { ResponsePaginated } from "@/interfaces/responses/ResponsePaginated";

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
		id: number;
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
};

export { roomService };
