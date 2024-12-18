import { cloneElement, createContext, useContext, useState } from "react";

import { Drawer } from "@mui/material";
import { ToastContainer } from "react-toastify";

import Loader from "@/components/Loader/Loader";

import "react-toastify/dist/ReactToastify.css";

interface IUiContext {
	setIsLoading: (value: boolean) => void;
	showDrawer: ({}: DrawerProps) => void;
}

const UiContext = createContext<IUiContext>({
	setIsLoading: (_value) => {},
	showDrawer: (_value) => {},
});

interface UiProviderProps {
	children: React.ReactNode;
}

interface DrawerProps {
	children: JSX.Element | null;
	position?: "top" | "left" | "bottom" | "right";
}

export default function UiProvider({ children }: UiProviderProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [drawerProps, setDrawerProps] = useState({
		children: null,
		position: "right",
	} as DrawerProps);

	/**
	 * showDrawer
	 * @param {DrawerProps} { children, position = "right" }
	 */
	function showDrawer({ children, position = "right" }: DrawerProps) {
		//console.log(children, position);
		setDrawerProps({
			children,
			position,
		});
	}

	/**
	 * closeDrawer
	 *
	 */
	function closeDrawer() {
		setDrawerProps({
			...drawerProps,
			children: null,
		});
	}

	return (
		<UiContext.Provider
			value={{
				setIsLoading,
				showDrawer,
			}}
		>
			{children}
			<div id="ui-portal"></div>
			<ToastContainer />
			{isLoading && <Loader />}
			{drawerProps.children && (
				<Drawer anchor={drawerProps.position} open={true} onClose={closeDrawer}>
					{cloneElement(drawerProps.children, { closeDrawer })}
				</Drawer>
			)}
		</UiContext.Provider>
	);
}

export const useUiContext = () => useContext(UiContext);
