import "./CommandUsage.css";
import { type ReactNode } from "react";


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
                    description="open SPECIAL.exe"
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
                    description="open PROJECTS.exe"
                />
            </div>
        </div>
    );
}

