import { type SkillCategory } from "./skills.data";

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

function formatCategoryRow(category: SkillCategory): string {
    const idCol = padRight(category.id, 14);
    const countLabel = `(${category.skills.length} skills)`;
    const titleWidth = BOX_WIDTH - 2 - idCol.length - 1 - countLabel.length;
    const titleCol = padRight(category.title, titleWidth);

    return `  ${idCol} ${titleCol}${countLabel}`;
}

export function buildSkillCategoriesBox(categories: SkillCategory[]): string {
    const top = `╔${"═".repeat(BOX_WIDTH)}╗`;
    const divider = `╠${"═".repeat(BOX_WIDTH)}╣`;
    const bottom = `╚${"═".repeat(BOX_WIDTH)}╝`;

    const title = `║${padCenter("SKILL CATEGORIES", BOX_WIDTH)}║`;
    const rows = categories.map(
        (category) => `║${formatCategoryRow(category)}║`,
    );
    const hint = `║${padCenter("Type: skills <category>   →  skills fullstack", BOX_WIDTH)}║`;

    return [top, title, divider, ...rows, divider, hint, bottom].join("\n");
}