import "./App.css";
import { useEffect, useRef } from "react";
import Hero from "./components/hero/Hero";
import { HelpOutput } from "./components/terminal-commands/Help/HelpOutput";
import { About } from "./components/terminal-commands/About/About";
import {
    ProjectDetail,
    ProjectsList,
} from "./components/terminal-commands/Projects/Projects";
import {
    SkillsCategory,
    SkillsList,
} from "./components/terminal-commands/Skills/Skills";
import {
    ContactUsage,
    ProjectsUsage,
    SkillsUsage,
} from "./components/terminal-commands/shared/CommandUsage";
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
            case "projects-list":
                return <ProjectsList />;
            case "projects-detail":
                return <ProjectDetail projectId={entry.projectId ?? ""} />;
            case "projects-usage":
                return (
                    <ProjectsUsage error="Unknown or incomplete projects command." />
                );
            case "skills-list":
                return <SkillsList />;
            case "skills-category":
                return (
                    <SkillsCategory categoryId={entry.skillsCategory ?? ""} />
                );
            case "skills-usage":
                return (
                    <SkillsUsage error="Unknown or incomplete skills command." />
                );
            case "contact-usage":
                return (
                    <ContactUsage error="Please add the required arguments for contact." />
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
                        Try <span className="cmd">help</span> to see available
                        commands.
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
                                            <span className="prompt-host">
                                                bernal-a@portfolio
                                            </span>
                                            :~${" "}
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
                                <span className="prompt-host">
                                    bernal-a@portfolio
                                </span>
                                :~${" "}
                            </span>
                            <div className="terminal-input-field">
                                {!input ? (
                                    <span
                                        className="terminal-input-hint"
                                        aria-hidden="true"
                                    >
                                        Type "help" and press Enter
                                    </span>
                                ) : null}
                                <input
                                    ref={inputRef}
                                    className="terminal-input"
                                    type="text"
                                    value={input}
                                    onChange={(e) =>
                                        setInput(e.target.value)
                                    }
                                    aria-label='Type "help" and press Enter'
                                    autoComplete="off"
                                    spellCheck={false}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
