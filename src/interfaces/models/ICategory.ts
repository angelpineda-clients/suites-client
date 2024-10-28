import { Product } from "../IProductResponse";

export interface ICategory {
	name: string;
	uuid: string;
	sortPosition: number;
	products: Product[];
}
