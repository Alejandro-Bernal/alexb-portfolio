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
    "Full-Stack Software Engineer | Systems & Infrastructure",
    "moosey OS 23.96.0",
    "visitor@bernalforge",
    "zsh 5.9",
    "linux-terminal",
    "Available commands:",
] as const;

const WELCOME_LINES = [
    "Welcome to visitor@bernalforge.dev",
    "I build reliable, scalable, and secure web apps, Mobile apps and more.",
    "I specialize in MERN stack, React Native (iOS/Android App Store deployments), and full-stack architecture.",
    "I adapt to any tech stack, learn fast, and deliver efficiently—from concept to production.",
] as const;

const ROLE = 0;
const OS = 1;
const HOST = 2;
const SHELL = 3;
const THEME = 4;
const CMD_HEADER = 5;

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

    const [commandCount, setCommandCount] = useState(0);
    const commandsDone =
        meta.isComplete && commandCount >= COMMANDS.length;

    useEffect(() => {
        if (!meta.isComplete) {
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
    }, [meta.isComplete, commandCount, skipAnim]);

    const welcome = useTypedSequence(WELCOME_LINES, {
        active: commandsDone,
        speed,
        linePause: 90,
    });

    const [linkCount, setLinkCount] = useState(0);
    const introDone = welcome.isComplete && linkCount >= 2;

    useEffect(() => {
        if (!welcome.isComplete) {
            return;
        }
        if (skipAnim) {
            setLinkCount(2);
            return;
        }
        if (linkCount >= 2) {
            return;
        }
        const timer = window.setTimeout(() => {
            setLinkCount((value) => value + 1);
        }, 140);
        return () => window.clearTimeout(timer);
    }, [welcome.isComplete, linkCount, skipAnim]);

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

                    {meta.started(CMD_HEADER) && (
                        <div className="fastfetch-commands">
                            <div className="commands-header">
                                <TypedText
                                    text={meta.textAt(CMD_HEADER)}
                                    showCursor={meta.isTyping(CMD_HEADER)}
                                />
                            </div>
                            {commandCount > 0 && (
                                <div className="command-list">
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

                            {commandsDone && (
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

                                    {linkCount > 0 && (
                                        <div className="welcome-links">
                                            {linkCount >= 1 && (
                                                <a
                                                    href="https://github.com/Alejandro-Bernal"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    GitHub
                                                </a>
                                            )}
                                            {linkCount >= 2 && (
                                                <a
                                                    href="https://www.linkedin.com/in/alejandro-bernal-cruz"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    LinkedIn
                                                </a>
                                            )}
                                        </div>
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
