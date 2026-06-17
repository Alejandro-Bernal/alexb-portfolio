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

                <p>Hi! Welcome to my portfolio CLI.</p>

                <p>
                    I'm Alejandro, a passionate Full-Stack Web and Software
                    Developer and tech enthusiast with the ability to create,
                    innovate and lead.
                </p>

                <p>
                    Born in El Salvador and having called Los Angeles home since
                    2004, I discovered my passion for technology through video
                    games — starting with Mario Bros. on the NES. This early
                    spark led me to dive hands-on into development in high
                    school, where I served as Scrum Leader and developer on a
                    team project that built SAT Fighters, a learn-as-you-play
                    SAT vocabulary prep game. Our work earned 2nd place in a
                    pitch contest and an invitation to Google LA, where I had
                    the opportunity to speak with Eric Schmidt. These
                    experiences solidified my path, culminating in a Bachelor of
                    Science in Computer Science from Cal State LA in 2020.
                </p>

                <p>
                    With over 6 years of progressive Full-Stack Software
                    Engineering experience, I build and scale robust, real-time
                    web applications using the MERN stack (React, TypeScript,
                    Node.js, Express, and MongoDB). I design and maintain
                    secure, cloud-native infrastructure on Amazon Web Services
                    (AWS) — dockerizing applications, hosting private MongoDB
                    instances, and implementing serverless architectures with
                    Lambda, EventBridge, and CloudWatch to deliver real-time
                    telemetry monitoring and zero-downtime production
                    environments.
                </p>

                <p>
                    I established and maintained CI/CD pipelines with GitHub
                    Actions, enforced high standards through rigorous code
                    reviews, and automated deployments using Vercel and Netlify.
                    With experience as Acting Technology Lead and HIPAA
                    Compliance Lead for over 3 years, I have successfully led
                    both small and large teams — guiding projects from concept
                    to production while ensuring momentum, quality, and timely
                    delivery in fast-paced environments.
                </p>

                <p>
                    My focus remains on writing clean, maintainable code and
                    architecting reliable, scalable systems that perform under
                    real-world demands.
                </p>

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
        </div>
    );
}
