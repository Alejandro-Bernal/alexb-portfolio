import "./App.css";
import Hero from "./components/hero/Hero";
import { useTheme } from "./hooks/useTheme";
import { THEMES } from "./types/global.types";

function App() {
    const { theme, changeTheme } = useTheme();
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
