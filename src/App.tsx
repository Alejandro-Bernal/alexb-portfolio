import "./App.css";
import Hero from "./components/hero/Hero";
import { useTheme } from "./hooks/useTheme";
import { useTerminal } from "./hooks/useTerminal";
import { THEMES } from "./types/global.types";

function App() {
    const { theme, changeTheme } = useTheme();
    const { input, setInput, history, onSubmit, inputRef } = useTerminal();

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

                        <div className="terminal-output">
                            {history.map((entry, idx) => (
                                <div key={idx} className="terminal-entry">
                                    <div>
                                        <span className="prompt-prefix">
                                            bernal-a@portfolio:~${" "}
                                        </span>
                                        <span>{entry.command}</span>
                                    </div>
                                    {entry.output.map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <form className="command-line" onSubmit={onSubmit}>
                            <span className="prompt-prefix">
                                bernal-a@portfolio:~${" "}
                            </span>
                            <input
                                ref={inputRef}
                                className="terminal-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder='Type "help" and press Enter'
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
