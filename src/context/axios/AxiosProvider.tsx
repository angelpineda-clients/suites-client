import { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";

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
			console.log(error);
			return Promise.reject(error);
		}
	);
	axios.interceptors.response.use(
		(response) => {
			return response.data;
		},
		function (error) {
			toast.error(error.response.data.message);
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
