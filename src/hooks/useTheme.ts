import { useState, useEffect } from "react";
import { type Theme, THEMES } from "../types/global.types";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("terminal-theme") as Theme | null;
        return saved && THEMES.includes(saved) ? saved : "green";
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem("terminal-theme", newTheme);
    };

    return {
        theme,
        changeTheme,
    };
}
