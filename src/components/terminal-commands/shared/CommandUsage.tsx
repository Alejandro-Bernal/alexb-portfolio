import "./CommandUsage.css";
import { type ReactNode } from "react";
import { PROJECT_IDS } from "../Projects/projects.data";
import { SKILL_CATEGORY_IDS } from "../Skills/skills.data";

type UsageEntryProps = {
    command: string;
    description: string;
    details?: ReactNode;
};

function UsageEntry({ command, description, details }: UsageEntryProps) {
    return (
        <div className="usage-entry">
            <div className="usage-command">
                <span className="cmd">{command}</span>
            </div>
            <p className="usage-desc">{description}</p>
            {details ? <div className="usage-details">{details}</div> : null}
        </div>
    );
}

type CommandUsageProps = {
    error?: string;
};

export function SkillsUsage({ error }: CommandUsageProps) {
    return (
        <div className="command-usage">
            {error ? <p className="usage-error">{error}</p> : null}
            <div className="usage-section">
                <UsageEntry
                    command="skills"
                    description="list skill categories"
                />
                <UsageEntry
                    command="skills <category>"
                    description="view proficiency for a category"
                    details={
                        <>
                            <p className="usage-detail">
                                categories: {SKILL_CATEGORY_IDS.join(", ")}
                            </p>
                            <p className="usage-detail">
                                example:{" "}
                                <span className="cmd">skills fullstack</span>
                            </p>
                        </>
                    }
                />
            </div>
        </div>
    );
}

export function ProjectsUsage({ error }: CommandUsageProps) {
    return (
        <div className="command-usage">
            {error ? <p className="usage-error">{error}</p> : null}
            <div className="usage-section">
                <UsageEntry
                    command="projects"
                    description="list all projects"
                />
                <UsageEntry
                    command="projects <id>"
                    description="open a project by id"
                    details={
                        <>
                            <p className="usage-detail">
                                projects: {PROJECT_IDS.join(", ")}
                            </p>
                            <p className="usage-detail">
                                example:{" "}
                                <span className="cmd">projects pathzero</span>
                            </p>
                        </>
                    }
                />
            </div>
        </div>
    );
}

export function ContactUsage({ error }: CommandUsageProps) {
    return (
        <div className="command-usage">
            {error ? <p className="usage-error">{error}</p> : null}
            <div className="usage-section">
                <div className="usage-entry usage-entry--multiline">
                    <div className="usage-command-block">
                        <span className="cmd">contact "&lt;name&gt;"</span>
                        <span className="cmd">
                            "&lt;email&gt;" "&lt;subject&gt;"
                        </span>
                        <span className="cmd">"&lt;message&gt;"</span>
                    </div>
                    <p className="usage-desc">
                        send a message (logged to console for now)
                    </p>
                    <div className="usage-details">
                        <p className="usage-detail">
                            example:{" "}
                            <span className="cmd">
                                contact "Moose" "me@email.com" "New Project"
                                "Let's build something"
                            </span>
                        </p>
                        <p className="usage-detail">
                            tip: wrap every value in quotes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}