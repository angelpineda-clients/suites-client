import axios from "axios";

interface IService {
	id: number;
	name: string;
}

const services = {
	getAll: async () => {
		const response = await axios.get("/service");
		const data = response.data;

		const rows = data.map((service: IService) => {
			return {
				id: service.id,
				name: service.name,
			};
		});

		return rows;
	},
	update: async (id: number, values: any) => {
		try {
			const response = await axios.put(`/service/${id}`, { ...values });
			const data = response.data;

			if (data.status == true) {
				return data;
			}

			throw new Error("Error al actualizar el servicio");
		} catch (error) {
			return error;
		}
	},
	create: async (service: string) => {
		try {
			const response = await axios.post(`/service`, { ...service });

			const data = response.data;

			if (data.status == true) {
				return data;
			}
		} catch (error) {
			return error;
		}
	},
	remove: async (id: number) => {
		try {
			const response = await axios.delete(`/service/${id}`);

			const data = await response.data;

			if (data.status == true) {
				return data;
			}
		} catch (error) {}
	},
};

export { services };
