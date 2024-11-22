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
			const errorObj = response.data.errors;

			let errors = "";
			if (typeof errorObj == "string") {
				errors = errorObj;
			}

			const errorArray =
				typeof errorObj == "object" ? Object.entries(errorObj) : [];

			console.log(errorArray);

			errorArray.forEach((error) => {
				const [field, errors] = error;

				errors.map((message) => {
					toast.error(`${field}: ${message}`);
				});
			});

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
