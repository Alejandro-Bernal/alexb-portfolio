export type Skill = {
    name: string;
    percent: number;
};

export type SkillCategory = {
    id: string;
    title: string;
    skills: Skill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        id: "fullstack",
        title: "Full Stack Development",
        skills: [
            { name: "TypeScript", percent: 92 },
            { name: "JavaScript", percent: 89 },
            { name: "React", percent: 91 },
            { name: "Node.js", percent: 87 },
            { name: "Express", percent: 84 },
            { name: "MongoDB", percent: 83 },
            { name: "Next.js", percent: 65 },
            { name: "Tailwind CSS", percent: 78 },
            { name: "REST / GraphQL", percent: 82 },
        ],
    },
    {
        id: "software",
        title: "Software Development",
        skills: [
            { name: "Python", percent: 71 },
            { name: "Java", percent: 52 },
            { name: "C++", percent: 67 },
            { name: "C#", percent: 79 },
            { name: "SQL & Databases", percent: 74 },
            { name: "Docker", percent: 76 },
            { name: "Linux / Bash", percent: 83 },
        ],
    },
    {
        id: "cloud",
        title: "Cloud & Infrastructure",
        skills: [
            { name: "AWS", percent: 78 },
            { name: "CI/CD (GitHub Actions)", percent: 64 },
            { name: "Kubernetes", percent: 40 },
            { name: "Serverless / Lambda", percent: 55 },
        ],
    },
    {
        id: "gamedev",
        title: "Game Development (Aspiring)",
        skills: [
            { name: "Unity (C#)", percent: 61 },
            { name: "Unreal Engine (C++)", percent: 43 },
            { name: "Godot Engine", percent: 35 },
            { name: "Game Architecture", percent: 48 },
            { name: "Shader Basics", percent: 30 },
        ],
    },
    {
        id: "tools",
        title: "Development Tools",
        skills: [
            { name: "VS Code", percent: 96 },
            { name: "Git", percent: 91 },
            { name: "GitHub", percent: 89 },
            { name: "Bitbucket", percent: 68 },
            { name: "Postman / API Client", percent: 82 },
            { name: "Figma (Design Handoff)", percent: 60 },
        ],
    },
    {
        id: "pm",
        title: "Project Mgmt & Tech Leadership",
        skills: [
            { name: "Agile / Scrum", percent: 76 },
            { name: "Project Management", percent: 69 },
            { name: "Technical Leadership", percent: 74 },
            { name: "Mentoring & Code Review", percent: 81 },
            { name: "Monday.com", percent: 60 },
            { name: "Stakeholder Management", percent: 66 },
        ],
    },
    {
        id: "soft",
        title: "Soft Skills",
        skills: [
            { name: "Problem Solving", percent: 89 },
            { name: "Communication", percent: 84 },
            { name: "Team Collaboration", percent: 86 },
            { name: "Adaptability", percent: 82 },
            { name: "Time Management", percent: 77 },
        ],
    },
];

export const SKILL_CATEGORY_IDS = SKILL_CATEGORIES.map((category) => category.id);

export function getSkillCategory(id: string): SkillCategory | undefined {
    return SKILL_CATEGORIES.find(
        (category) => category.id === id.toLowerCase(),
    );
}