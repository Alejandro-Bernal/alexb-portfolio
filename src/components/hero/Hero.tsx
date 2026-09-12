import "./Hero.css";
import { FigletBanner } from "./FigletBanner";
import { useEffect, useMemo, useRef, useState } from "react";
import { TypedText } from "./TypedText";
import { useTypedSequence } from "../../hooks/useTypedSequence";

const COMMANDS = [
    "help",
    "whoami",
    "projects",
    "skills",
    "contact",
    "contact-now",
    "resume",
    "moose",
    "clear",
] as const;

const META_LINES = [
    "Full-Stack Software Engineer | Web | Mobile | Cloud | Architecture",
    "Passionate about tooling that moves production teams",
    "moosey OS 23.96.0",
    "bernalforge.dev",
    "zsh 5.9",
    "linux-terminal",
] as const;

const WELCOME_LINES = [
    "BERNAL FORGE (TM) TERMLINK PROTOCOL\nPERSONNEL FILE LOADED",
    "I build full-stack web and mobile apps — user interfaces, APIs, integrations, and the cloud architecture under them (Linux, Docker, AWS).",
    "I support production teams that need expert tooling and fast support: internal tools, pipelines, and systems that keep multiple fields moving.",
    "I have spent six years building those tools and systems for production teams across more than one field.",
] as const;

const ROLE = 0;
const TAGLINE = 1;
const OS = 2;
const HOST = 3;
const SHELL = 4;
const THEME = 5;

type HeroProps = {
    startIntro?: boolean;
    instant?: boolean;
    onIntroComplete?: () => void;
    onRunCommand?: (command: string) => void;
};

function Hero({
    startIntro = true,
    instant = false,
    onIntroComplete,
    onRunCommand,
}: HeroProps) {
    const reduceMotion = useMemo(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        [],
    );
    const skipAnim = reduceMotion || instant;
    const speed = skipAnim ? 0 : 16;

    const meta = useTypedSequence(META_LINES, {
        active: startIntro,
        speed,
        linePause: 70,
    });

    const welcome = useTypedSequence(WELCOME_LINES, {
        active: meta.isComplete,
        speed,
        linePause: 90,
    });

    const hint = useTypedSequence(["Tap or Type Any command..."], {
        active: welcome.isComplete,
        speed,
        linePause: 90,
    });

    const [commandCount, setCommandCount] = useState(0);
    const commandsDone = hint.isComplete && commandCount >= COMMANDS.length;
    const introDone = commandsDone;

    useEffect(() => {
        if (!hint.isComplete) {
            return;
        }
        if (skipAnim) {
            setCommandCount(COMMANDS.length);
            return;
        }
        if (commandCount >= COMMANDS.length) {
            return;
        }
        const timer = window.setTimeout(() => {
            setCommandCount((value) => value + 1);
        }, 70);
        return () => window.clearTimeout(timer);
    }, [hint.isComplete, commandCount, skipAnim]);

    const notified = useRef(false);
    useEffect(() => {
        if (!introDone || notified.current) {
            return;
        }
        notified.current = true;
        onIntroComplete?.();
    }, [introDone, onIntroComplete]);

    return (
        <div className="ascii-hero">
            <div className="hero-text">
                <FigletBanner text="Alejandro Bernal Cruz" />

                {meta.started(ROLE) && (
                    <div className="hero-roles">
                        <div className="role">
                            <TypedText
                                text={meta.textAt(ROLE)}
                                showCursor={meta.isTyping(ROLE)}
                            />
                        </div>
                        {meta.started(TAGLINE) && (
                            <div className="hero-tagline">
                                <TypedText
                                    text={meta.textAt(TAGLINE)}
                                    showCursor={meta.isTyping(TAGLINE)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="fastfetch">
                <div className="fastfetch-info">
                    {meta.started(OS) && (
                        <div className="fastfetch-line">
                            <span className="label">OS</span>
                            <span className="separator">:</span>
                            <span className="value">
                                <TypedText
                                    text={meta.textAt(OS)}
                                    showCursor={meta.isTyping(OS)}
                                />
                            </span>
                        </div>
                    )}

                    {meta.started(HOST) && (
                        <div className="fastfetch-line">
                            <span className="label">Host</span>
                            <span className="separator">:</span>
                            <span className="value">
                                <TypedText
                                    text={meta.textAt(HOST)}
                                    showCursor={meta.isTyping(HOST)}
                                />
                            </span>
                        </div>
                    )}

                    {meta.started(SHELL) && (
                        <div className="fastfetch-line">
                            <span className="label">Shell</span>
                            <span className="separator">:</span>
                            <span className="value">
                                <TypedText
                                    text={meta.textAt(SHELL)}
                                    showCursor={meta.isTyping(SHELL)}
                                />
                            </span>
                        </div>
                    )}

                    {meta.started(THEME) && (
                        <div className="fastfetch-line">
                            <span className="label">Theme</span>
                            <span className="separator">:</span>
                            <span className="value">
                                <TypedText
                                    text={meta.textAt(THEME)}
                                    showCursor={meta.isTyping(THEME)}
                                />
                            </span>
                        </div>
                    )}

                    {meta.isComplete && (
                        <div className="fastfetch-welcome">
                            {welcome.started(0) && (
                                <p className="welcome-line welcome-host">
                                    <TypedText
                                        text={welcome.textAt(0)}
                                        showCursor={welcome.isTyping(0)}
                                    />
                                </p>
                            )}
                            {welcome.started(1) && (
                                <p className="welcome-line welcome-desc">
                                    <TypedText
                                        text={welcome.textAt(1)}
                                        showCursor={welcome.isTyping(1)}
                                    />
                                </p>
                            )}
                            {welcome.started(2) && (
                                <p className="welcome-line welcome-desc">
                                    <TypedText
                                        text={welcome.textAt(2)}
                                        showCursor={welcome.isTyping(2)}
                                    />
                                </p>
                            )}
                            {welcome.started(3) && (
                                <p className="welcome-line welcome-desc">
                                    <TypedText
                                        text={welcome.textAt(3)}
                                        showCursor={welcome.isTyping(3)}
                                    />
                                </p>
                            )}

                            {hint.started(0) && (
                                <p className="welcome-line welcome-hint">
                                    <TypedText
                                        text={hint.textAt(0)}
                                        showCursor={hint.isTyping(0)}
                                    />
                                </p>
                            )}

                            {commandCount > 0 && (
                                <div
                                    className="command-chip-bar"
                                    aria-label="Commands"
                                >
                                    {COMMANDS.slice(0, commandCount).map(
                                        (command) => (
                                            <button
                                                key={command}
                                                type="button"
                                                className="command-chip"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    onRunCommand?.(command);
                                                }}
                                            >
                                                {command}
                                            </button>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Hero;
