import { createTheme, ThemeProvider } from "@mui/material";

interface CustomThemeProviderProps {
	children: React.ReactNode;
}

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#f65954",
		},
		secondary: {
			main: "#47465f",
		},
		text: {
			primary: "#222326",
		},
	},
});

export default function CustomThemeProvider({
	children,
}: CustomThemeProviderProps) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
