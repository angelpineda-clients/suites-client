export interface IProductResponse {
	status: string;
	results: Product[];
}

export interface Product {
	uuid: string;
	name: string;
	description: string;
	imageUrl: string;
	legacyId: string;
	price: string;
	alcoholCount: number;
	soldAlone: boolean;
	availability: string;
	providerAvailability: null;
	category: Category;
	barcode: string;
}

export interface Category {
	uuid: string;
	name: string;
	sortPosition: number;
}
