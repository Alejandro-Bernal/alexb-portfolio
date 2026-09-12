import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/hero/Hero";
import { HelpOutput } from "./components/terminal-commands/Help/HelpOutput";
import { About } from "./components/terminal-commands/About/About";
import { MooseRunner } from "./components/terminal-commands/MooseRunner/MooseRunner";
import { SpecialScreen } from "./components/terminal-commands/Skills/SpecialScreen";
import { ProjectsScreen } from "./components/terminal-commands/Projects/ProjectsScreen";
import { ContactInfo } from "./components/terminal-commands/Contact/ContactInfo";
import {
    ContactArgsHint,
    ContactCancelled,
    ContactPrompt,
    ContactStart,
    ContactSuccess,
} from "./components/terminal-commands/Contact/Contact";
import { Resume } from "./components/terminal-commands/Resume/Resume";
import { Footer } from "./components/Footer/Footer";
import { PrivacyPolicy } from "./pages/PrivacyPolicy/PrivacyPolicy";
import { BootScreen } from "./components/boot/BootScreen";
import { useTerminal } from "./hooks/useTerminal";
import { type TerminalEntry } from "./types/global.types";

function TerminalPortfolio() {
    const [booted, setBooted] = useState(false);
    const [showBoot, setShowBoot] = useState(true);
    const [introComplete, setIntroComplete] = useState(false);
    const [overlay, setOverlay] = useState<
        "moose" | "special" | "projects" | null
    >(null);
    const {
        input,
        setInput,
        history,
        onSubmit,
        inputRef,
        inputHint,
        contactStep,
        typeAndRun,
    } = useTerminal();
    const closeOverlay = () => {
        setOverlay(null);
        window.setTimeout(() => inputRef.current?.focus(), 50);
    };

    const bottomRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, introComplete]);

    useEffect(() => {
        if (introComplete && !overlay) {
            inputRef.current?.focus();
        }
    }, [introComplete, overlay]);

    useEffect(() => {
        const last = history.at(-1)?.kind;
        if (last === "moose") {
            setOverlay("moose");
        }
        if (last === "skills") {
            setOverlay("special");
        }
        if (last === "projects") {
            setOverlay("projects");
        }
        if (last === "moose" || last === "skills" || last === "projects") {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent a new line from being added
            // Create and dispatch a submit event on the form
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        }
    };

    const renderCommandOutput = (entry: TerminalEntry) => {
        switch (entry.kind) {
            case "help":
                return <HelpOutput />;
            case "about":
            case "whoami":
                return <About />;
            case "moose":
                return (
                    <div className="neofetch-note">easter egg: moose.exe</div>
                );
            case "projects":
            case "projects-list":
            case "projects-detail":
            case "projects-usage":
                return (
                    <div className="neofetch-note">opened PROJECTS.exe</div>
                );
            case "skills":
            case "skills-list":
            case "skills-category":
            case "skills-usage":
                return (
                    <div className="neofetch-note">opened SPECIAL.exe</div>
                );
            case "contact-start":
                return <ContactStart />;
            case "contact-prompt":
                return (
                    <ContactPrompt
                        prompt={entry.contactPrompt ?? ""}
                        step={entry.contactStep}
                    />
                );
            case "contact-error":
                return (
                    <ContactPrompt
                        prompt={entry.contactPrompt ?? ""}
                        error={entry.contactError}
                        step={entry.contactStep}
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
        <div
            id="center"
            onClick={() => {
                if (introComplete && !overlay) {
                    inputRef.current?.focus();
                }
            }}
        >
            <div className="terminal-window">
                {showBoot && (
                    <BootScreen
                        onComplete={() => {
                            setBooted(true);
                            window.setTimeout(() => {
                                setShowBoot(false);
                            }, 900);
                        }}
                    />
                )}
                {overlay === "moose" ? (
                    <MooseRunner onExit={closeOverlay} />
                ) : overlay === "special" ? (
                    <SpecialScreen onExit={closeOverlay} />
                ) : overlay === "projects" ? (
                    <ProjectsScreen onExit={closeOverlay} />
                ) : (
                <div
                    className={`terminal-body${booted ? "" : " is-booting"}`}
                    aria-hidden={!booted}
                >
                        <Hero
                            startIntro={booted && !showBoot}
                            instant={introComplete}
                            onIntroComplete={() => setIntroComplete(true)}
                            onRunCommand={typeAndRun}
                        />

                        <div className="terminal-output">
                            {history.map((entry, idx) => (
                                <div key={idx} className="terminal-entry">
                                    <div>
                                        <span className="prompt-prefix">
                                            <span className="prompt-host">
                                                visitor@bernalforge
                                            </span>
                                            :~${" "}
                                        </span>
                                        <span>{entry.command}</span>
                                    </div>
                                    <div>{renderCommandOutput(entry)}</div>
                                </div>
                            ))}
                        </div>

                        <form
                            className={`command-line${introComplete ? "" : " is-waiting"}`}
                            onSubmit={onSubmit}
                            ref={formRef}
                            aria-hidden={!introComplete}
                        >
                            <span className="prompt-prefix">
                                <span className="prompt-host">
                                    visitor@bernalforge
                                </span>
                                :~${" "}
                            </span>
                            <div className="terminal-input-field">
                                <div
                                    className={`terminal-input-edit${contactStep === "message" ? " is-multiline" : ""}`}
                                >
                                    {introComplete && (
                                        <span
                                            className="terminal-caret-sizer"
                                            aria-hidden="true"
                                        >
                                            {input}
                                            <span className="cursor" />
                                        </span>
                                    )}
                                    {contactStep === "message" ? (
                                        <textarea
                                            ref={
                                                inputRef as unknown as React.RefObject<HTMLTextAreaElement>
                                            }
                                            className="terminal-textarea"
                                            value={input}
                                            onChange={(e) =>
                                                setInput(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            onFocus={(e) => {
                                                e.currentTarget.scrollIntoView({
                                                    block: "nearest",
                                                });
                                            }}
                                            aria-label="Terminal message input"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            autoCapitalize="none"
                                            spellCheck={false}
                                            autoFocus={introComplete}
                                            enterKeyHint="send"
                                            rows={1}
                                            onInput={(e) => {
                                                const target =
                                                    e.target as HTMLTextAreaElement;
                                                target.style.height = "auto";
                                                target.style.height = `${target.scrollHeight}px`;
                                            }}
                                        />
                                    ) : (
                                        <input
                                            ref={
                                                inputRef as unknown as React.RefObject<HTMLInputElement>
                                            }
                                            className="terminal-input"
                                            type="text"
                                            value={input}
                                            onChange={(e) =>
                                                setInput(e.target.value)
                                            }
                                            onFocus={(e) => {
                                                e.currentTarget.scrollIntoView({
                                                    block: "nearest",
                                                });
                                            }}
                                            aria-label="Terminal input"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            autoCapitalize="none"
                                            spellCheck={false}
                                            autoFocus={introComplete}
                                            enterKeyHint="go"
                                            inputMode="text"
                                        />
                                    )}
                                </div>
                                {input &&
                                    (() => {
                                        const match =
                                            inputHint.match(/(?:Max |\/)(\d+)/);
                                        if (!match) return null;

                                        const limit = match[1];
                                        return (
                                            <span className="terminal-char-counter">
                                                ({input.length}/{limit})
                                            </span>
                                        );
                                    })()}
                            </div>
                        </form>
                        <div ref={bottomRef} />
                    </div>
                )}
                <Footer />
            </div>
        </div>
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
