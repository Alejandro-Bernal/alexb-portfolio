import { type Project } from "./projects.data";

const BOX_WIDTH = 60;

function padCenter(text: string, width: number): string {
    if (text.length >= width) {
        return text.slice(0, width);
    }

    const leftPad = Math.floor((width - text.length) / 2);
    return " ".repeat(leftPad) + text + " ".repeat(width - text.length - leftPad);
}

function padRight(text: string, width: number): string {
    if (text.length >= width) {
        return text.slice(0, width);
    }

    return text + " ".repeat(width - text.length);
}

function formatStatusBadge(status: Project["status"]): string {
    return `[${status}]`;
}

function formatProjectRow(project: Project): string {
    const idCol = padRight(project.id, 14);
    const badge = formatStatusBadge(project.status);
    const titleWidth =
        BOX_WIDTH - 2 - idCol.length - 1 - badge.length - 1;
    const titleCol = padRight(project.name, Math.max(titleWidth, 0));

    return `  ${idCol} ${titleCol} ${badge}`;
}

export function buildProjectsListBox(projects: Project[]): string {
    const top = `╔${"═".repeat(BOX_WIDTH)}╗`;
    const divider = `╠${"═".repeat(BOX_WIDTH)}╣`;
    const bottom = `╚${"═".repeat(BOX_WIDTH)}╝`;

    const title = `║${padCenter("~/projects/", BOX_WIDTH)}║`;
    const rows = projects.map((project) => `║${formatProjectRow(project)}║`);
    const hint = `║${padCenter("Type: projects <id>   →  projects portfolio", BOX_WIDTH)}║`;

    return [top, title, divider, ...rows, divider, hint, bottom].join("\n");
}