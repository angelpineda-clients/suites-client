import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../axios/AxiosProvider";
import { useUserStore } from "@/store/user";
import axios from "axios";

interface IAuthContext {
	logout: () => void;
	isAuthenticated: boolean;
	getAccessToken: () => string;
	accessToken: string;
	setAuthTokens: (_accessToken: string, _refreshToken: string) => void;
	isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
	logout: () => {},
	isAuthenticated: false,
	getAccessToken: () => "",
	accessToken: "",
	setAuthTokens: (_accessToken: string, _refreshToken: string) => {},
	isLoading: false,
});

interface AuthProviderProps {
	children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const { setAxiosToken } = useAxios();
	const [accessToken, setAccessToken] = useState("");
	const [refreshToken, setRefreshToken] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const setUser = useUserStore((state) => state.setUser);

	function setAuthTokens(accessToken: string, refreshToken: string) {
		setAccessToken(accessToken);
		setRefreshToken(refreshToken);

		if (accessToken && refreshToken) {
			setIsAuthenticated(true);
			setAxiosToken(accessToken);
		}

		localStorage.setItem("token", JSON.stringify(refreshToken));
	}

	function getAccessToken() {
		return accessToken;
	}

	function logout() {
		localStorage.removeItem("token");
		setAccessToken("");
		setRefreshToken("");
		setIsAuthenticated(false);
	}

	async function checkAuth() {
		setIsLoading(true);

		try {
			if (!!accessToken) {
				setAccessToken(accessToken);
				setIsAuthenticated(true);
			} else {
				const token = localStorage.getItem("token");

				if (token) {
					const refreshToken = JSON.parse(token);

					const response = await axios.post(`/refresh`, {
						refresh_token: refreshToken,
					});

					const { access_token, refresh_token } = response.data.auth;

					setAuthTokens(access_token, refresh_token);

					const roles: string[] = [];

					if (response.data.user.roles) {
						response.data.user?.roles.forEach((element) => {
							roles.push(element.name);
						});
					}

					setUser({
						...response.data?.user,
						roles: roles,
					});
				}
			}
		} catch (error) {
			logout();
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				logout,
				setAuthTokens,
				getAccessToken,
				accessToken,
				isAuthenticated,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
