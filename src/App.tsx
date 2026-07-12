import "./App.css";
import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/hero/Hero";
import { HelpOutput } from "./components/terminal-commands/Help/HelpOutput";
import { About } from "./components/terminal-commands/About/About";
import Neofetch from "./components/terminal-commands/Neofetch/Neofetch";
import { ContactInfo } from "./components/terminal-commands/Contact/ContactInfo";
import {
    ProjectDetail,
    ProjectsList,
} from "./components/terminal-commands/Projects/Projects";
import {
    SkillsCategory,
    SkillsList,
} from "./components/terminal-commands/Skills/Skills";
import {
    ContactArgsHint,
    ContactCancelled,
    ContactPrompt,
    ContactStart,
    ContactSuccess,
} from "./components/terminal-commands/Contact/Contact";
import {
    ProjectsUsage,
    SkillsUsage,
} from "./components/terminal-commands/shared/CommandUsage";
import { Resume } from "./components/terminal-commands/Resume/Resume";
import { Footer } from "./components/Footer/Footer";
import { PrivacyPolicy } from "./pages/PrivacyPolicy/PrivacyPolicy";
import { useTheme } from "./hooks/useTheme";
import { useTerminal } from "./hooks/useTerminal";
import { THEMES, type TerminalEntry } from "./types/global.types";

function TerminalPortfolio() {
    const { theme, changeTheme } = useTheme();
    const { input, setInput, history, onSubmit, inputRef, inputHint } =
        useTerminal();

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
            case "moose":
                return <Neofetch />;
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
            case "contact-start":
                return <ContactStart />;
            case "contact-prompt":
                return <ContactPrompt prompt={entry.contactPrompt ?? ""} />;
            case "contact-error":
                return (
                    <ContactPrompt
                        prompt={entry.contactPrompt ?? ""}
                        error={entry.contactError}
                    />
                );
            case "contact-success":
                return (
                    <ContactSuccess
                        payload={
                            entry.contactPayload ?? {
                                name: "",
                                email: "",
                                subject: "",
                                message: "",
                            }
                        }
                        delivered={entry.contactDelivered}
                        message={entry.contactMessage}
                    />
                );
            case "contact-cancelled":
                return <ContactCancelled />;
            case "contact-args":
                return <ContactArgsHint />;
            case "contact-info":
                return <ContactInfo />;
            case "resume":
                return <Resume />;
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

            <div id="center" onClick={() => inputRef.current?.focus()}>
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
                                        {inputHint}
                                    </span>
                                ) : null}
                                <input
                                    ref={inputRef}
                                    className="terminal-input"
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    aria-label={inputHint}
                                    autoComplete="off"
                                    spellCheck={false}
                                    autoFocus
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<TerminalPortfolio />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
    );
}

export default App;
