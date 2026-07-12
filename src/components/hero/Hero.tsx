import "./Hero.css";
import { FigletBanner } from "./FigletBanner";
import { useState } from "react";
import { TypedText } from "./TypedText";
import { useTypeEffect } from "../../hooks/useTypeEffect";

function Hero() {
    // Inside the Hero function, add state to check first visit:
    const [shouldAnimate] = useState(() => {
        const hasVisited = localStorage.getItem("portfolio_visited");
        if (!hasVisited) {
            localStorage.setItem("portfolio_visited", "true");
            return true;
        }
        return false;
    });

    // Define the text for each line
    // Pass the speed as 0 if shouldAnimate is false to render instantly.
    const hookSpeed = shouldAnimate ? 25 : 0;
    const line1Text = "Welcome to visitor@bernalforge.dev";
    const line2Text =
        "I build reliable, scalable, and secure web apps, Mobile apps and more.";
    const line3Text =
        "I specialize in MERN stack, React Native (iOS/Android App Store deployments), and full-stack architecture.";
    const line4Text =
        "I adapt to any tech stack, learn fast, and deliver efficiently—from concept to production.";

    // Line 1 starts if we should animate, OR if it's an instant render.
    const { displayedText: line1, isComplete: line1Done } = useTypeEffect(
        line1Text,
        { startOnMount: true, speed: hookSpeed },
    );
    const { displayedText: line2, isComplete: line2Done } = useTypeEffect(
        line2Text,
        { startOnMount: line1Done, speed: hookSpeed },
    );
    const { displayedText: line3, isComplete: line3Done } = useTypeEffect(
        line3Text,
        { startOnMount: line2Done, speed: hookSpeed },
    );
    const { displayedText: line4, isComplete: line4Done } = useTypeEffect(
        line4Text,
        { startOnMount: line3Done, speed: hookSpeed },
    );

    return (
        <div className="ascii-hero">
            <div className="hero-text">
                <FigletBanner text="Alejandro Bernal Cruz" font="Slant" />

                <div className="hero-roles">
                    <div className="role">
                        Full-Stack Software Engineer | Systems &amp;
                        Infrastructure
                    </div>
                </div>
            </div>

            {/* Fastfetch mock - moose as the "logo" on the left, system info on the right */}
            <div className="fastfetch">
                {/* <pre className="ascii-moose" aria-hidden="true">
                    {mooseArt}
                </pre> */}

                <div className="fastfetch-info">
                    <div className="fastfetch-line">
                        <span className="label">OS</span>
                        <span className="separator">:</span>
                        <span className="value">moosey OS 23.96.0</span>
                    </div>

                    <div className="fastfetch-line">
                        <span className="label">Host</span>
                        <span className="separator">:</span>
                        <span className="value">
                            alejandro-bernal@portfolio
                        </span>
                    </div>

                    <div className="fastfetch-line">
                        <span className="label">Shell</span>
                        <span className="separator">:</span>
                        <span className="value">zsh 5.9</span>
                    </div>

                    <div className="fastfetch-line">
                        <span className="label">Theme</span>
                        <span className="separator">:</span>
                        <span className="value">linux-terminal</span>
                    </div>

                    <div className="fastfetch-commands">
                        <div className="commands-header">
                            Available commands:
                        </div>
                        <div className="command-list">
                            <span>help</span>
                            <span>about</span>
                            <span>projects</span>
                            <span>skills</span>
                            <span>contact</span>
                            <span>resume</span>
                            <span>clear</span>
                            <span>moose</span>
                        </div>

                        <div className="fastfetch-welcome">
                            <p className="welcome-line welcome-host">
                                <TypedText
                                    text={line1}
                                    showCursor={shouldAnimate && !line1Done}
                                />
                            </p>

                            <p className="welcome-line welcome-desc">
                                <TypedText
                                    text={line2}
                                    showCursor={line1Done && !line2Done}
                                />
                            </p>

                            <p className="welcome-line welcome-desc">
                                <TypedText
                                    text={line3}
                                    showCursor={line2Done && !line3Done}
                                />
                            </p>

                            <p className="welcome-line welcome-desc">
                                <TypedText
                                    text={line4}
                                    showCursor={line3Done && !line4Done}
                                />
                            </p>

                            {/* Links appear after all typing is done */}
                            {line4Done && (
                                <div className="welcome-links">
                                    <a
                                        href="https://github.com/Alejandro-Bernal"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/alejandro-bernal-cruz"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
