import { getProject } from "../components/terminal-commands/Projects/projects.data";
import { getSkillCategory } from "../components/terminal-commands/Skills/skills.data";
import { type CommandKind } from "../types/global.types";

export type FsRoute = {
    kind: CommandKind;
    skillsCategory?: string;
    projectId?: string;
};

export function normalizePath(path: string): string {
    return path.replace(/\/$/, "").toLowerCase();
}

export function resolveLsPath(pathArg: string): "root" | "projects" | "skills" | null {
    const path = normalizePath(pathArg);

    if (path === "" || path === ".") {
        return "root";
    }

    if (path === "projects") {
        return "projects";
    }

    if (path === "skills") {
        return "skills";
    }

    return null;
}

export function resolveCat(target: string): FsRoute | null {
    const normalized = target.toLowerCase();

    if (normalized === "about.txt") {
        return { kind: "about" };
    }

    if (normalized === "help.txt") {
        return { kind: "help" };
    }

    if (normalized === "contact.sh") {
        return { kind: "contact-usage" };
    }

    const skillsMatch = normalized.match(/^skills\/([a-z]+)\.txt$/);
    if (skillsMatch) {
        const category = getSkillCategory(skillsMatch[1]);

        if (category) {
            return {
                kind: "skills-category",
                skillsCategory: category.id,
            };
        }
    }

    const projectMatch = normalized.match(/^projects\/([a-z0-9-]+)\/readme\.md$/);
    if (projectMatch) {
        const project = getProject(projectMatch[1]);

        if (project) {
            return {
                kind: "projects-detail",
                projectId: project.id,
            };
        }
    }

    return null;
}

export function isContactScript(command: string): boolean {
    const normalized = command.toLowerCase();
    return normalized === "contact" || normalized === "contact.sh";
}