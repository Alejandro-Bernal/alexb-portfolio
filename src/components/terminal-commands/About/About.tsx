import "./About.css";
import selfPortrait from "../../../assets/alejandro.png";
import selfPortraitAmber from "../../../assets/alejandro-amber.png";
import selfPortraitSolarized from "../../../assets/alejandro-sol.png";
import { useTheme } from "../../../hooks/useTheme";
import { type Theme } from "../../../types/global.types";

const PORTRAITS: Record<Theme, string> = {
    green: selfPortrait,
    amber: selfPortraitAmber,
    solarized: selfPortraitSolarized,
};

export function About() {
    const { theme } = useTheme();

    return (
        <div className="about-output">
            <div className="about-wrapper">
                <img
                    src={PORTRAITS[theme]}
                    alt="Alejandro Bernal Cruz"
                    className="about-portrait"
                />

                <p>Hi. I'm Alejandro.</p>

                <p>
                    I was born in El Salvador and grew up in Los Angeles. Mario
                    Bros. on the NES was the gateway. I wanted to know how those
                    games worked and how they were built.
                </p>

                <p>
                    I have always been artistic. I still am. Computer science is
                    the art I chose. Coding is the canvas. I use it to build
                    worlds, tools, and solutions people can actually use.
                </p>

                <p>
                    In high school I led development on my first game, SAT
                    Fighters, a learn-as-you-play vocabulary title. I was Scrum
                    leader and a developer on the team. We took 2nd place in a
                    pitch contest and were invited to Google LA, where I spoke
                    with Eric Schmidt. That is when liking games became shipping
                    software. I earned a B.S. in Computer Science from Cal State
                    LA in 2020.
                </p>

                <p>
                    For six years I have been a full-stack engineer who also
                    mentors and teaches. I have built scalable web and mobile
                    applications, shipped small games, and led classes meant to
                    pull the next engineers into the field. Most recently I
                    built tools and integrations for agile legal systems, with
                    the security and scalability HIPAA work requires.
                </p>

                <p>
                    I want the next chapter on a team that needs internal
                    systems. I can maintain what you have or build the tool from
                    scratch. The goal is the same. Help the team ship.
                </p>

                <div className="about-divider" />

                <p className="about-section-label">Let's connect!</p>

                <div className="about-contact">
                    <div>
                        <span className="about-label">Email</span>
                        <a href="mailto:contact@bernalforge.dev">
                            contact@bernalforge.dev
                        </a>
                    </div>
                    <div>
                        <span className="about-label">GitHub</span>
                        <a
                            href="https://github.com/Alejandro-Bernal"
                            target="_blank"
                            rel="noreferrer"
                        >
                            github.com/Alejandro-Bernal
                        </a>
                    </div>
                    <div>
                        <span className="about-label">LinkedIn</span>
                        <a
                            href="https://www.linkedin.com/in/alejandro-bernal-cruz"
                            target="_blank"
                            rel="noreferrer"
                        >
                            linkedin.com/in/alejandro-bernal-cruz
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
