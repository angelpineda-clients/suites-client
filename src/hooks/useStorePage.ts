/* Libraries */
import { useAxios } from "@/context/axios/AxiosProvider";
/* store */
import { useUserStore } from "@/store/stores";
/* interfaces */
import { IMeResponse, IProductResponse } from "@/interfaces";
import { useUiContext } from "@/context/ui/UiProvider";
import { toast } from "react-toastify";

export default function useStorePage() {
	const { axiosInstance } = useAxios();
	const { setIsLoading } = useUiContext();
	const setStore = useUserStore((state) => state.setStore);
	const setProducts = useUserStore((state) => state.setProducts);

	/**
	 * getMe
	 * fetch user data and assign it to zustand store
	 */
	async function getMe() {
		setIsLoading(true);
		try {
			const response: IMeResponse = await axiosInstance.get("/v1/users/me");
			setStore(response);
		} catch (error) {
			toast.error("Error al obtener datos de usuario.");
		} finally {
			setIsLoading(false);
		}
	}

	/**
	 * getProducts
	 * fetch products by store
	 * @param {string} [storeID]
	 */
	async function getProducts(storeID?: string) {
		if (!storeID) {
			return;
		}

		setIsLoading(true);
		try {
			const response: IProductResponse = await axiosInstance.get(
				`/v1/products/?store=${storeID}`
			);

			setProducts(response);
		} catch (error) {
			toast.error("Error al obtener productos.");
		} finally {
			setIsLoading(false);
		}
	}

	return {
		getMe,
		getProducts,
	};
}
