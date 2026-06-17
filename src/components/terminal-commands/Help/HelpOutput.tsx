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

type HelpContactRowProps = {
    description: string;
    note?: string;
};

function HelpContactRow({ description, note }: HelpContactRowProps) {
    return (
        <li className="help-row help-row--multiline">
            <div className="help-cmd-block">
                <span className="help-cmd">contact "&lt;name&gt;"</span>
                <span className="help-cmd">"&lt;email&gt;" "&lt;subject&gt;"</span>
                <span className="help-cmd">"&lt;message&gt;"</span>
            </div>
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
                <HelpContactRow
                    description="send a message"
                    note='e.g. contact "Moose" "me@email.com" "Hello" "Your message here"'
                />
            </HelpSection>
        </div>
    );
}