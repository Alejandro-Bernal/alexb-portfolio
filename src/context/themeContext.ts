import { createContext } from "react";
import { type Theme, THEMES } from "../types/global.types";

export type ThemeContextValue = {
    theme: Theme;
    changeTheme: (newTheme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function getInitialTheme(): Theme {
    const saved = localStorage.getItem("terminal-theme") as Theme | null;
    return saved && THEMES.includes(saved) ? saved : "green";
}