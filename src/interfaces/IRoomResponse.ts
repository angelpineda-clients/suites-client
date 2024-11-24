import { IFloor, ISize } from "./models";

export interface IRoomResponse {
	id: number;
	name: string;
	slug: string;
	description: string;
	capacity: number;
	beds: number;
	price: number;
	size_id: number;
	floor_id: number;
	created_at: Date;
	updated_at: Date;
	floor: IFloor;
	size: ISize;
	services: Service[];
	images: Image[];
}

export interface Service {
	id: number;
	name: string;
	alias?: string;
	pivot: ServicePivot;
}

export interface ServicePivot {
	room_id: number;
	service_id: number;
}

export interface Image {
	id: number;
	url: string;
	public_id: string;
	created_at: Date;
	updated_at: Date;
	pivot: ImagePivot;
}

export interface ImagePivot {
	imageable_type: string;
	imageable_id: number;
	image_id: number;
}
