import { Image } from "./models";

export interface ImageResponse {
	success: boolean;
	data: Image[];
	message: string;
}
