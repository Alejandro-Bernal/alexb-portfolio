import "./Projects.css";
import { getProject, PROJECTS } from "./projects.data";
import { buildProjectsListBox } from "./projectsBox";

export function ProjectsList() {
    const box = buildProjectsListBox(PROJECTS);

    return (
        <div className="projects-output" aria-label="project directory listing">
            <pre className="projects-box">{box}</pre>
        </div>
    );
}

export function ProjectDetail({ projectId }: { projectId: string }) {
    const project = getProject(projectId);

    if (!project) {
        return null;
    }

    return (
        <div
            className="projects-output"
            aria-label={`${project.name} project details`}
        >
            <div className="project-readme">
                <h2 className="project-title">{project.name}</h2>
                <p className="project-tagline">
                    &gt; {project.summary.split(".")[0]}.
                </p>

                {project.status === "nda" ? (
                    <p className="project-nda-notice">
                        ⚠ confidential / NDA — client anonymized, no public
                        repo, demo, or screenshots
                    </p>
                ) : null}

                <div className="project-meta">
                    <div className="project-meta-row">
                        <span className="project-meta-key">status</span>
                        <span className="project-meta-val">
                            <span
                                className={`project-status project-status--${project.status}`}
                            >
                                ● {project.status}
                            </span>
                        </span>
                    </div>
                    <div className="project-meta-row">
                        <span className="project-meta-key">role</span>
                        <span className="project-meta-val">{project.role}</span>
                    </div>
                    <div className="project-meta-row">
                        <span className="project-meta-key">stack</span>
                        <span className="project-meta-val">
                            {project.stack.join(" · ")}
                        </span>
                    </div>
                    <div className="project-meta-row">
                        <span className="project-meta-key">period</span>
                        <span className="project-meta-val">{project.period}</span>
                    </div>
                </div>

                <p className="project-section-label">## overview</p>
                <p className="project-body">{project.summary}</p>

                <p className="project-section-label">## highlights</p>
                <ul className="project-highlights">
                    {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <p className="project-section-label">## links</p>
                <ul className="project-links">
                    {project.links.map((link) => (
                        <li key={link.label}>
                            <span className="project-link-key">
                                {link.label.padEnd(6)}
                            </span>
                            {link.url ? (
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="project-link-url"
                                >
                                    {link.url}
                                </a>
                            ) : (
                                <span className="project-link-note">
                                    {link.note}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}