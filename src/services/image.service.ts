import { ImageResponse } from "@/interfaces/ImageResponse";
import { Image } from "@/interfaces/models";
import axios from "axios";

interface ImageRequestProps {
	entityID: number;
	entityModelName: string;
}

const imageService = {
	create: async ({
		images,
		entityID,
		entityModelName,
	}: {
		images: any;
	} & ImageRequestProps): Promise<Image[]> => {
		try {
			const response: ImageResponse = await axios.post(
				`/image`,
				{
					model_id: entityID,
					model_type: entityModelName,
					...images,
				},
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);

			return response.data;
		} catch (error) {
			return [];
		}
	},
	getAll: async ({
		entityID,
		entityModelName,
	}: ImageRequestProps): Promise<Image[]> => {
		try {
			let response: ImageResponse;

			if (!entityID || !entityModelName) {
				response = await axios.get(`/image`);
			} else {
				response = await axios.get(
					`/image?model_type=${entityModelName}&model_id=${entityID}`
				);
			}

			return response.data;
		} catch (error) {
			return [];
		}
	},
	remove: async ({
		id,
		entityID,
		entityModelName,
	}: { id: number } & ImageRequestProps): Promise<Image[]> => {
		try {
			const response: ImageResponse = await axios.delete(
				`/image/${id}?model_type=${entityModelName}&model_id=${entityID}`
			);

			return response.data;
		} catch (error) {
			return [];
		}
	},
};

export { imageService };
