/* Libraries */
import axios from "axios";
/* Interfaces */
import { ISeason } from "@/interfaces/models";
import { SeasonResponse } from "@/interfaces/SeasonResponse";
import { toast } from "react-toastify";

const seasonService = {
	getAll: async (): Promise<ISeason[] | []> => {
		try {
			const { response }: SeasonResponse = await axios.get("/season");

			if (!response?.status === true || !response) {
				throw new Error("Error al obtener todas las temporadas.");
			}

			return response.data;
		} catch (error: any) {
			toast.error(error?.message);
		}

		return [];
	},
	create: async (season: ISeason): Promise<ISeason[] | []> => {
		try {
			const { response }: SeasonResponse = await axios.post(`/season`, {
				...season,
			});

			if (!response?.status === true || !response) {
				throw new Error("Error al obtener la temporada creada.");
			}

			return response.data;
		} catch (error: any) {
			toast.error(error?.message);
		}

		return [];
	},
	update: async (id: number, season: ISeason): Promise<ISeason[] | []> => {
		try {
			const { response }: SeasonResponse = await axios.put(`/season/${id}`, {
				...season,
			});

			if (!response) {
				toast.error("Error al obtener la temporada actualizada");
			}
			return response.data;
		} catch (error) {
			console.error(error);
		}

		return [];
	},
	remove: async (id: number): Promise<ISeason[] | []> => {
		try {
			const { response }: SeasonResponse = await axios.delete(`/season/${id}`);

			if (!response) {
				toast.error("Error al obtener la temporada eleminada");
			}
			return response.data;
		} catch (error) {
			console.error(error);
		}

		return [];
	},
};

export { seasonService };
