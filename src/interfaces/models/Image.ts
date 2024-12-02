export interface Image {
	id: number;
	url: string;
	public_id: string;
	pivot: Pivot;
}

export interface Pivot {
	imageable_type: string;
	imageable_id: number;
	image_id: number;
}
