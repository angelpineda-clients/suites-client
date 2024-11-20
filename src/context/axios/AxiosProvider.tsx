import { createContext, useContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";

// Define the shape of the context
interface AxiosContext {
	setAxiosToken: (value: string) => void;
}

// Create the context with an initial empty value
const AxiosContext = createContext<AxiosContext>({
	setAxiosToken: () => {},
});

interface AxiosProviderProps {
	children: React.ReactNode;
}

export default function AxiosProvider({ children }: AxiosProviderProps) {
	axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
	axios.interceptors.request.use(
		(config) => {
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
	axios.interceptors.response.use(
		(response) => {
			return response.data;
		},
		function (error) {
			const { response } = error;

			if (response) {
				switch (response.status) {
					case 401:
						toast.error("Unauthorized.");
						break;

					case 403:
						toast.error("Prohibited access.");
						break;

					case 404:
						toast.error("Resource not found.");
						break;

					case 500:
						toast.error("Internal server error.");
						break;

					default:
						toast.error(`Unkow error: ${response?.data?.message}`);
						break;
				}
			}
			return Promise.reject(error);
		}
	);

	function setAxiosToken(value: string) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${value}`;
	}

	return (
		<AxiosContext.Provider value={{ setAxiosToken }}>
			{children}
		</AxiosContext.Provider>
	);
}

export const useAxios = () => useContext(AxiosContext);
