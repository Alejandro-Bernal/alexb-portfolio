import "./About.css";
import selfPortrait from "../../../assets/self-portrait.png";

export function About() {
    return (
        <div className="about-output">
            <img
                src={selfPortrait}
                alt="Alejandro Bernal Cruz"
                className="about-portrait"
            />

            <p>Hey there, fellow web surfer!</p>
            <p>
                I'm Alejandro Bernal Cruz, I go by Ale to most, but my buddies
                also call me Moose (Nickname that just stuck).
            </p>
            <p>
                I hail from El Salvador and have proudly called Los Angeles, CA
                my home since 2004. Growing up, video games weren't just
                entertainment — they were virtual canvases that sparked my
                imagination and ultimately led me to Computer Science. I've
                always been fascinated by how these digital worlds are built,
                and that passion has driven me to create my own{" "}
                <span className="about-hint">
                    (spoiler: there's a secret game hidden somewhere in this
                    portfolio... shhh)
                </span>
                .
            </p>
            <p>
                With over 6 years of hands-on Full-Stack Development experience,
                I've built and scaled real-time web applications using React,
                TypeScript, Node.js, Express, and MongoDB. I've also architected
                cloud-native solutions on AWS, managed Linux servers and Docker
                environments, set up CI/CD pipelines, and stepped up as Acting
                Technology Lead and HIPAA Compliance Lead.
            </p>

            <p className="about-section-label">What lights me up:</p>
            <ul>
                <li>
                    Designing user-friendly interfaces with personality and
                    polish
                </li>
                <li>
                    Building secure, scalable backend systems and real-time
                    features (WebSockets, anyone?)
                </li>
                <li>
                    Leading small teams, mentoring devs, and driving projects
                    from idea to production
                </li>
                <li>
                    Geeking out over tech, gaming (lifelong fan), and coding
                </li>
            </ul>

            <div className="about-divider" />

            <p className="about-section-label">Let's connect!</p>
            <div className="about-contact">
                <div>
                    <span className="about-label">Email</span>
                    <a href="mailto:alexbernal32396@gmail.com">
                        alexbernal32396@gmail.com
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
    );
}
