import { Image, IRoomResponse, Service } from "@/interfaces/IRoomResponse";
import { IRoom, IService, Image as RoomImage } from "@/interfaces/models/IRoom";

export function adapterRoom(rooms: IRoomResponse[]): IRoom[] {
	const data = rooms.map((room) => {
		return {
			id: room.id,
			name: room.name || "",
			slug: room.slug || "",
			description: room.description || "",
			capacity: room.capacity || 0,
			beds: room.beds || 0,
			price: room.price || 0,
			floor: room.floor || 0,
			size: room.size || 0,
			services: getServices(room?.services || []),
			images: getImages(room?.images || []),
		};
	});

	return data;
}

function getServices(services: Service[]): IService[] {
	const data = services.map((service) => {
		return {
			id: service.id,
			name: service.name,
			alias: service?.alias,
			pivot: {
				roomID: service.pivot.room_id,
				serviceID: service.pivot.service_id,
			},
		};
	});

	return data;
}

function getImages(images: Image[]): RoomImage[] {
	const data = images.map((image) => {
		return {
			id: image.id,
			url: image.url,
			publicID: image.public_id,
			pivot: {
				imageableType: image.pivot.imageable_type,
				imageID: image.pivot.image_id,
				imageableID: image.pivot.imageable_id,
			},
		};
	});

	return data;
}
