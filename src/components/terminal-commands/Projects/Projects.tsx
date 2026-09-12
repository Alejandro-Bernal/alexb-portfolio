import { type ReactNode } from "react";
import "./Projects.css";
import "../Help/HelpOutput.css";
import { getProject, PROJECTS, type Project } from "./projects.data";

function ProjectRow({
    id,
    name,
    status,
}: {
    id: string;
    name: string;
    status: string;
}) {
    return (
        <li className="help-row">
            <span className="help-cmd">{id}</span>
            <div className="help-desc-block">
                <span className="help-desc">{name}</span>
                <span className="help-note">[{status}]</span>
            </div>
        </li>
    );
}

export function ProjectsList() {
    return (
        <div className="help-output" aria-label="project directory listing">
            <div className="help-section">
                <p className="help-section-title">Projects</p>
                <ul className="help-table">
                    {PROJECTS.map((project) => (
                        <ProjectRow
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            status={project.status}
                        />
                    ))}
                </ul>
            </div>

            <div className="help-section">
                <p className="help-section-title">Usage</p>
                <ul className="help-table">
                    <li className="help-row">
                        <span className="help-cmd">projects &lt;id&gt;</span>
                        <div className="help-desc-block">
                            <span className="help-desc">
                                open a project by id
                            </span>
                            <span className="help-note">
                                e.g. projects pathzero
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function StarBlock({
    letter,
    label,
    children,
}: {
    letter: string;
    label: string;
    children: ReactNode;
}) {
    return (
        <section className="project-star-block">
            <p className="project-star-label">
                <span className="project-star-letter">{letter}</span> {label}
            </p>
            {children}
        </section>
    );
}

export function ProjectReadme({ project }: { project: Project }) {
    return (
        <div className="project-readme">
            <h2 className="project-title">{project.name}</h2>
            <p className="project-tagline">&gt; {project.tagline}</p>

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
                    <span className="project-meta-key">company</span>
                    <span className="project-meta-val">{project.company}</span>
                </div>
                <div className="project-meta-row">
                    <span className="project-meta-key">role</span>
                    <span className="project-meta-val">{project.role}</span>
                </div>
                <div className="project-meta-row">
                    <span className="project-meta-key">period</span>
                    <span className="project-meta-val">{project.period}</span>
                </div>
            </div>

            <p className="project-section-label">## STAR</p>

            <StarBlock letter="S" label="Situation">
                <p className="project-body">{project.star.situation}</p>
            </StarBlock>

            <StarBlock letter="T" label="Task">
                <p className="project-body">{project.star.task}</p>
            </StarBlock>

            <StarBlock letter="A" label="Action">
                <ul className="project-highlights">
                    {project.star.action.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </StarBlock>

            <StarBlock letter="R" label="Result">
                <ul className="project-highlights">
                    {project.star.result.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </StarBlock>

            <p className="project-section-label">## stack</p>
            <ul className="project-stack">
                {project.stack.map((item) => (
                    <li key={item.name} className="project-stack-row">
                        <span className="project-stack-name">{item.name}</span>
                        <span className="project-stack-use">{item.use}</span>
                    </li>
                ))}
            </ul>

            {project.links?.length ? (
                <>
                    <p className="project-section-label">## links</p>
                    <ul className="project-links">
                        {project.links.map((link) => (
                            <li className="project-link-row" key={link.label}>
                                <span className="project-link-key">
                                    {link.label}
                                </span>
                                <span className="project-link-val">
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
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}

            {project.status === "nda" ? (
                <p className="project-nda-notice">
                    Proprietary / NDA. No public repo, demo, or screenshots.
                    Vendor names listed only where they were already public.
                    Add metrics here when you can share them.
                </p>
            ) : project.status === "production" ? (
                <p className="project-access-notice">
                    Internal production system. No public repo, demo, or
                    screenshots.
                </p>
            ) : null}
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
            <ProjectReadme project={project} />
        </div>
    );
}
