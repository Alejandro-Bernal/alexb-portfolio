// Global types for the project
export type Theme = "green" | "amber" | "solarized";
export const THEMES: Theme[] = ["green", "amber", "solarized"];

// handle and track the commands
export type CommandKind =
    | "empty"
    | "help"
    | "about"
    | "projects"
    | "skills"
    | "contact-usage"
    | "contact-success"
    | "clear"
    | "unknown";

export type ContactPayload = {
    email: string;
    name: string;
    subject: string;
    message: string;
};

// for useTerminal Hook
export type TerminalEntry = {
    command: string;
    kind: CommandKind;
    contactPayload?: ContactPayload;
};
