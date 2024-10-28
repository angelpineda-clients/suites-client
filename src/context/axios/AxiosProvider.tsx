import { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";

import { toast } from "react-toastify";

// Define the shape of the context
interface AxiosContext {
	axiosInstance: AxiosInstance;
	setAxiosToken: (value: string) => void;
}

const defaultAxiosIsnstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL || "",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

// Create the context with an initial empty value
const AxiosContext = createContext<AxiosContext>({
	axiosInstance: defaultAxiosIsnstance,
	setAxiosToken: () => {},
});

interface AxiosProviderProps {
	children: React.ReactNode;
}

export default function AxiosProvider({ children }: AxiosProviderProps) {
	const axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL || "",
		headers: {
			"Content-Type": "application/json",
			/* Authorization: `Bearer ${axiosToken}`, */
		},
		timeout: 5000,
	});

	axiosInstance.interceptors.response.use(
		function (response) {
			return response?.data;
		},
		function (error) {
			console.log(error.response);
			toast.error(error?.response?.data?.message);
			return Promise.reject(error);
		}
	);

	function setAxiosToken(value: string) {
		axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${value}`;
	}

	return (
		<AxiosContext.Provider value={{ axiosInstance, setAxiosToken }}>
			{children}
		</AxiosContext.Provider>
	);
}

export const useAxios = () => useContext(AxiosContext);
