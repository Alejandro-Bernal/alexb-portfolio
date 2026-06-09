import { useEffect, useState } from "react";
import "./App.css";
import Hero from "./components/hero/Hero";

type Theme = "green" | "amber" | "solarized";

const THEMES: Theme[] = ["green", "amber", "solarized"];

function App() {
    const [theme, setTheme] = useState<Theme>("green");

    useEffect(() => {
        const saved = localStorage.getItem("terminal-theme") as Theme | null;
        const initial = saved && THEMES.includes(saved) ? saved : "green";
        setTheme(initial);
        document.documentElement.dataset.theme = initial;
    }, []);

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem("terminal-theme", newTheme);
    };

    return (
        <>
            <div className="theme-switcher">
                {THEMES.map((t) => (
                    <button
                        key={t}
                        className={`theme-btn ${theme === t ? "active" : ""}`}
                        onClick={() => changeTheme(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div id="center">
                <div className="terminal-window">
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>alejandro-bernal@portfolio</span>
                    </div>
                    <div className="terminal-body">
                        <Hero />

                        <div className="command-line">
                            <span className="prompt-prefix">
                                alex@portfolio:~$&nbsp;
                            </span>
                            <input
                                className="terminal-input"
                                type="text"
                                placeholder="Type a command... (try help, about, clear)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
