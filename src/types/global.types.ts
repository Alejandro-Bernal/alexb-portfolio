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
    | "contact"
    | "clear"
    | "unknown";

// for useTerminal Hook
export type TerminalEntry = {
    command: string;
    kind: CommandKind;
};
