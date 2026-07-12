import { useEffect, useState, type ReactNode } from "react";
import { type Theme } from "../types/global.types";
import { getInitialTheme, ThemeContext } from "../context/themeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem("terminal-theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}