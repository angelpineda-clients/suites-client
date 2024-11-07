import { IService } from "@/interfaces/models";
import { ServiceResponse } from "@/interfaces/ServiceResponse";
import axios from "axios";
import { toast } from "react-toastify";

const services = {
	getAll: async (): Promise<IService[] | undefined> => {
		try {
			const { response }: ServiceResponse = await axios.get("/service");

			if (!response) {
				throw new Error("Error al obtener todos los servicios.");
			}

			return response.data;
		} catch (error: any) {
			toast.error(error?.message);
		}
	},
	create: async (service: IService): Promise<IService[] | undefined> => {
		try {
			const { response }: ServiceResponse = await axios.post(`/service`, {
				...service,
			});

			if (!response) {
				throw new Error("Error al obtener los servicios creados.");
			}

			return response?.data;
		} catch (error: any) {
			toast.error(error?.message);
		}
	},
	update: async (
		id: number,
		values: IService
	): Promise<IService[] | undefined> => {
		try {
			const { response }: ServiceResponse = await axios.put(`/service/${id}`, {
				...values,
			});

			if (!response) {
				toast.error("Error al obtener el servicio actualizado");
			}
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},

	remove: async (id: number): Promise<IService[] | undefined> => {
		try {
			const { response }: ServiceResponse = await axios.delete(
				`/service/${id}`
			);

			if (!response) {
				toast.error("Error al obtener el servicio eliminado");
			}

			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
};

export { services };
