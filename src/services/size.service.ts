/* Libraries */
import axios from "axios";
/* Interfaces */
import { ISize } from "@/interfaces/models";
import { SizeResponse } from "@/interfaces/SizeResponse";

const sizeService = {
	getAll: async (): Promise<ISize[] | undefined> => {
		try {
			const { response }: SizeResponse = await axios.get("/size");

			if (!response?.status === true || !response) {
				throw new Error("Error al obtener todas los tamaños.");
			}

			return response.data;
		} catch (error: any) {
			console.error(error?.message);
		}
	},
	create: async (season: ISize): Promise<ISize[] | undefined> => {
		try {
			const { response }: SizeResponse = await axios.post(`/size`, {
				...season,
			});

			if (!response?.status === true || !response) {
				throw new Error("Error al obtener el tamaño creada.");
			}

			return response.data;
		} catch (error: any) {
			console.error(error?.message);
		}
	},
	update: async (id: number, season: ISize): Promise<ISize[] | undefined> => {
		try {
			const { response }: SizeResponse = await axios.put(`/size/${id}`, {
				...season,
			});

			if (!response) {
				console.error("Error al obtener el tamaño actualizado");
			}
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	remove: async (id: number): Promise<ISize[] | undefined> => {
		try {
			const { response }: SizeResponse = await axios.delete(`/size/${id}`);

			if (!response) {
				console.error("Error al obtener el tamaño eleminado");
			}
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
};

export { sizeService };
