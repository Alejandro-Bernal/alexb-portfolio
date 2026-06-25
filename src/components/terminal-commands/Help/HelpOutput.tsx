import "./HelpOutput.css";
import { type ReactNode } from "react";
import { PROJECT_IDS } from "../Projects/projects.data";
import { SKILL_CATEGORY_IDS } from "../Skills/skills.data";

type HelpRowProps = {
    command: string;
    description: string;
    note?: string;
};

function HelpRow({ command, description, note }: HelpRowProps) {
    return (
        <li className="help-row">
            <span className="help-cmd">{command}</span>
            <div className="help-desc-block">
                <span className="help-desc">{description}</span>
                {note ? <span className="help-note">{note}</span> : null}
            </div>
        </li>
    );
}

type HelpSectionProps = {
    title: string;
    children: ReactNode;
};

function HelpSection({ title, children }: HelpSectionProps) {
    return (
        <div className="help-section">
            <p className="help-section-title">{title}</p>
            <ul className="help-table">{children}</ul>
        </div>
    );
}

export function HelpOutput() {
    return (
        <div className="help-output">
            <p className="help-name">
                <span className="cmd">moosey OS terminal</span> v1.0.0
            </p>
            <p className="help-tagline">
                Type a command and press Enter.
            </p>

            <HelpSection title="Commands">
                <HelpRow command="help" description="show this guide" />
                <HelpRow command="about" description="my introduction" />
                <HelpRow command="projects" description="list all projects" />
                <HelpRow
                    command="skills"
                    description="list skill categories"
                />
                <HelpRow command="clear" description="clear the terminal screen" />
                <HelpRow
                    command="contact"
                    description="send a message (interactive prompts)"
                    note="type cancel to exit the form"
                />
            </HelpSection>

            <HelpSection title="Usage">
                <HelpRow
                    command="projects <id>"
                    description="open a project by id"
                    note={PROJECT_IDS.join(", ")}
                />
                <HelpRow
                    command="skills <category>"
                    description="view proficiency for a category"
                    note={SKILL_CATEGORY_IDS.join(", ")}
                />
            </HelpSection>
        </div>
    );
}