import { ISize } from "./ISize";
import { IFloor } from "./IFloor";
import { Image } from "./Image";

export interface IRoom {
	id: number;
	name: string;
	slug: string;
	description: string;
	capacity: number;
	beds: number;
	price: number;
	sizeID?: number;
	floorID?: number;
	floor: IFloor;
	size: ISize;
	services: IService[];
	images: Image[];
}

export interface IService {
	id: number;
	name: string;
	alias?: string;
	pivot?: ServicePivot;
}

export interface ServicePivot {
	roomID: number;
	serviceID: number;
}
