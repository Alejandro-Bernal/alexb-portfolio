import "./App.css";
import { useEffect, useRef } from "react";
import Hero from "./components/hero/Hero";
import { HelpOutput } from "./components/terminal-commands/Help/HelpOutput";
import { About } from "./components/terminal-commands/About/About";
import { Skills } from "./components/terminal-commands/Skills/Skills";
import { useTheme } from "./hooks/useTheme";
import { useTerminal } from "./hooks/useTerminal";
import { THEMES, type TerminalEntry } from "./types/global.types";

function App() {
    const { theme, changeTheme } = useTheme();
    const { input, setInput, history, onSubmit, inputRef } = useTerminal();

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const renderCommandOutput = (entry: TerminalEntry) => {
        switch (entry.kind) {
            case "help":
                return <HelpOutput />;
            case "about":
                return <About />;
            case "skills":
                return <Skills />;
            case "contact-usage":
                return (
                    <div>
                        <div>
                            Please add the required arguments for contact.
                        </div>
                        <div>
                            Example:{" "}
                            <span className="cmd">
                                contact email name subject message
                            </span>
                        </div>
                        <div>
                            Tip: wrap values with spaces in quotes, e.g.{" "}
                            <span className="cmd">
                                contact me@email.com Moose "New Project" "Let's
                                build something"
                            </span>
                        </div>
                    </div>
                );
            case "contact-success":
                return (
                    <div>
                        <div>Message captured and logged to console.</div>
                        <div>
                            From: {entry.contactPayload?.name} (
                            {entry.contactPayload?.email})
                        </div>
                        <div>Subject: {entry.contactPayload?.subject}</div>
                        <div>Message: {entry.contactPayload?.message}</div>
                    </div>
                );
            case "clear":
                return null;
            case "empty":
                return (
                    <div>
                        Try using <span className="cmd">help</span> to see the
                        list of available commands.
                    </div>
                );
            case "unknown":
                return <div>Command not found: {entry.command}</div>;
            default:
                return null;
        }
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

                        <div className="terminal-output">
                            {history.map((entry, idx) => (
                                <div key={idx} className="terminal-entry">
                                    <div>
                                        <span className="prompt-prefix">
                                            bernal-a@portfolio:~${" "}
                                        </span>
                                        <span>{entry.command}</span>
                                    </div>
                                    <div>{renderCommandOutput(entry)}</div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
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
