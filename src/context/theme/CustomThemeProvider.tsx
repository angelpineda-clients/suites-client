import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
  setMode: (mode: PaletteMode) => void;
}

const ThemeModeContext = createContext<ThemeContextValue>({
  mode: "light",
  toggleMode: () => {},
  setMode: () => {},
});

const brandPalette = {
  primary: {
    light: "#5ed7db",
    main: "#26b8bc",
    dark: "#1f8e91",
  },
  secondary: {
    light: "#c9b69b",
    main: "#4f4537",
    dark: "#2c241a",
  },
  info: {
    light: "#67b8eb",
    main: "#3f8dda",
    dark: "#1f5ea6",
  },
  error: {
    light: "#ff7a6e",
    main: "#d64631",
    dark: "#9f2e22",
  },
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: brandPalette.primary,
    secondary: brandPalette.secondary,
    info: brandPalette.info,
    error: brandPalette.error,
    background:
      mode === "light"
        ? { default: "#fff7ed", paper: "#ffffff" }
        : { default: "#0e1318", paper: "#111827" },
    text:
      mode === "light"
        ? { primary: "#1f2937", secondary: "#4b5563" }
        : { primary: "#e5e7eb", secondary: "#9ca3af" },
  },
  typography: {
    fontFamily: "'Poppins', 'Helvetica Neue', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: "none" as const },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            mode === "light"
              ? "linear-gradient(180deg, #fff7ed 0%, #ffffff 60%)"
              : "linear-gradient(180deg, #0e1318 0%, #0b1015 60%)",
          color: mode === "light" ? "#1f2937" : "#e5e7eb",
          minHeight: "100vh",
          transition: "background-color 200ms ease, color 200ms ease",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 18,
          paddingBlock: 10,
          fontSize: 14,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow:
            mode === "light"
              ? "0px 12px 40px rgba(15, 23, 42, 0.08)"
              : "0px 14px 50px rgba(0, 0, 0, 0.45)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 55,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined" as const,
        size: "small" as const,
      },
    },
  },
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = useMemo(() => responsiveFontSizes(createTheme(getDesignTokens(mode))), [mode]);

  const toggleMode = () => setMode((current) => (current === "light" ? "dark" : "light"));

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
