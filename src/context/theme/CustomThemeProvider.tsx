import { createTheme, ThemeProvider } from "@mui/material";

interface CustomThemeProviderProps {
	children: React.ReactNode;
}

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1976d2",
			light: "#42a5f5",
			dark: "#1565c0",
		},
		secondary: {
			main: "#47465f",
		},
		info: {
			main: "#67E2EB",
			light: "#678FEB",
			dark: "#67B8EB",
		},
		error: {
			main: "#D64631",
			light: "#AC3927",
			dark: "#CE442F",
		},
		text: {
			primary: "#222326",
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					height: 55,
				},
			},
		},
	},
});

export default function CustomThemeProvider({
	children,
}: CustomThemeProviderProps) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
