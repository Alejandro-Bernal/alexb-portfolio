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
                    Bros. on the NES was the gateway to my passion for video
                    games and technology. I was always curious to know how those
                    games worked and how they were built.
                </p>

                <p>
                    I have always been artistic. I still am. I chose Computer
                    science because I found it mixes my artistic passion and
                    technology, a blend that allows for new apps, websites,
                    games and much more to be created. Coding is the tool to
                    fill the canvas. I use it to build apps that solve community
                    problems, to build tools for agile teams, to mentor younger
                    aspiring engineers, and now create worlds and solutions
                    people can actually use.
                </p>

                <p>
                    My first achievement was in High School, where I led
                    development on my first game. SAT Fighters, a
                    learn-as-you-play vocabulary mobile app, with the goal of
                    helping our High Schoolers prepare for SAT vocabulary
                    portion. I was Scrum leader and a developer on the team. We
                    took 2nd place in a pitch contest and were invited to Google
                    LA, where I spoke with Eric Schmidt. That is when I decided
                    to pursue a career in programming. I earned a B.S. in
                    Computer Science from Cal State LA in 2020.
                </p>

                <p>
                    For six years I have been a full-stack engineer who builds
                    for teams, for users that require solutions and mentors the
                    next generation for engineers. I have built scalable web and
                    mobile applications, shipped small games, and led classes.
                    Most recently I built tools and integrations for agile legal
                    systems, with the security and scalability HIPAA work
                    requires.
                </p>

                <p>
                    I am looking to embark on the next chapter in my career, to
                    join a team that needs secure, scalable and customizable
                    internal systems. I can maintain what you have or build the
                    tool from scratch. The goal is the same. Help the team ship.
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
