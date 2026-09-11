import { useEffect, useState } from "react";
import { PROJECTS } from "./projects.data";
import { ProjectReadme } from "./Projects";
import "./ProjectsScreen.css";

type ProjectsScreenProps = {
    onExit: () => void;
};

export function ProjectsScreen({ onExit }: ProjectsScreenProps) {
    const [selectedId, setSelectedId] = useState(PROJECTS[0]?.id ?? "");
    const project =
        PROJECTS.find((item) => item.id === selectedId) ?? PROJECTS[0];

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                event.preventDefault();
                onExit();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onExit]);

    if (!project) {
        return null;
    }

    return (
        <div className="projects-screen">
            <header className="projects-exe-header">
                <div>
                    <p className="projects-exe">PROJECTS.EXE</p>
                    <p className="projects-exe-sub">
                        project directory — click a repo to inspect
                    </p>
                </div>
                <button
                    type="button"
                    className="projects-exe-exit"
                    onClick={onExit}
                >
                    exit
                </button>
            </header>

            <div className="projects-exe-body">
                <nav className="projects-exe-nav" aria-label="Projects">
                    {PROJECTS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={
                                item.id === selectedId
                                    ? "projects-exe-item is-active"
                                    : "projects-exe-item"
                            }
                            onClick={() => setSelectedId(item.id)}
                        >
                            <span className="projects-exe-id">{item.id}</span>
                            <span className="projects-exe-name">
                                {item.name}
                            </span>
                            <span
                                className={`projects-exe-status project-status--${item.status}`}
                            >
                                {item.status}
                            </span>
                        </button>
                    ))}
                </nav>

                <section
                    className="projects-exe-detail"
                    aria-live="polite"
                    aria-label={`${project.name} project details`}
                >
                    <ProjectReadme project={project} />
                </section>
            </div>
        </div>
    );
}
