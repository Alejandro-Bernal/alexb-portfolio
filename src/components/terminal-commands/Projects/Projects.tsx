import "./Projects.css";
import "../Help/HelpOutput.css";
import { getProject, PROJECTS } from "./projects.data";

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
                        ⚠ proprietary / NDA — no public repo, demo, or
                        screenshots. Descriptions focus on transferable skills;
                        third-party services named only where publicly known.
                    </p>
                ) : project.status === "production" ? (
                    <p className="project-access-notice">
                        ⚠ internal production system — secured behind company
                        infrastructure; no public repo, demo, or screenshots
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
                        <span className="project-meta-key">company</span>
                        <span className="project-meta-val">
                            {project.company}
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
                        <span className="project-meta-val">
                            {project.period}
                        </span>
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

                {project.skillsDemonstrated?.length ? (
                    <>
                        <p className="project-section-label">
                            ## skills demonstrated
                        </p>
                        <ul className="project-highlights">
                            {project.skillsDemonstrated.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </>
                ) : null}

                {project.links?.length ? (
                    <>
                        <p className="project-section-label">## links</p>
                        <ul className="project-links">
                            {project.links.map((link) => (
                                <li
                                    className="project-link-row"
                                    key={link.label}
                                >
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
            </div>
        </div>
    );
}
