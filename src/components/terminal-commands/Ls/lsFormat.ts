import { PROJECTS } from "../Projects/projects.data";
import { SKILL_CATEGORIES } from "../Skills/skills.data";

function formatColumns(items: string[]): string {
    return items.join("   ");
}

export function formatRootListing(): string {
    return formatColumns([
        "about.txt",
        "contact.sh",
        "help.txt",
        "projects/",
        "skills/",
    ]);
}

export function formatProjectsListing(): string {
    return formatColumns(PROJECTS.map((project) => `${project.id}/`));
}

export function formatSkillsListing(): string {
    return formatColumns(
        SKILL_CATEGORIES.map((category) => `${category.id}.txt`),
    );
}