"use client";

import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/constants";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const initialState: ThemeContextState = {
  theme: "dark",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeContext = createContext<ThemeContextState>(initialState);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTheme =
      (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || DEFAULT_THEME;
    setTheme(storedTheme);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  console.log(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
