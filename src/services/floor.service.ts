/* Libraries */
import axios from "axios";
/* Interfaces */
import { IFloor } from "@/interfaces/models";
import { FloorResponse } from "@/interfaces/FloorResponse";
import { toast } from "react-toastify";

const floorService = {
	getAll: async (): Promise<IFloor[] | undefined> => {
		try {
			const { response }: FloorResponse = await axios.get("/floor");

			if (!response?.status === true || !response) {
				throw new Error("Error al obtener todos los pisos.");
			}

			return response.data;
		} catch (error: any) {
			toast.error(error?.message);
		}
	},
	create: async (season: IFloor): Promise<IFloor[] | undefined> => {
		try {
			const { response }: FloorResponse = await axios.post(`/floor`, {
				...season,
			});

			if (!response?.status === true || !response) {
				throw new Error("Error al obtener el piso creado.");
			}

			return response.data;
		} catch (error: any) {
			toast.error(error?.message);
		}
	},
	update: async (id: number, season: IFloor): Promise<IFloor[] | undefined> => {
		try {
			const { response }: FloorResponse = await axios.put(`/floor/${id}`, {
				...season,
			});

			if (!response) {
				throw new Error("Error al obtener el piso actualizado");
			}
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
	remove: async (id: number): Promise<IFloor[] | undefined> => {
		try {
			const { response }: FloorResponse = await axios.delete(`/floor/${id}`);

			if (!response) {
				throw new Error("Error al obtener el piso eleminado");
			}
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
};

export { floorService };
