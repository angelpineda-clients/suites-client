import Loader from "@/components/Loader/Loader";
import { createContext, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface IUiContext {
	setIsLoading: (value: boolean) => void;
}

const UiContext = createContext<IUiContext>({
	setIsLoading: (_value) => {},
});

interface UiProviderProps {
	children: React.ReactNode;
}

export default function UiProvider({ children }: UiProviderProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<UiContext.Provider
			value={{
				setIsLoading,
			}}
		>
			{children}
			<ToastContainer />
			{isLoading && <Loader />}
		</UiContext.Provider>
	);
}

export const useUiContext = () => useContext(UiContext);
