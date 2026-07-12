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
            { name: "TypeScript", percent: 95 },
            { name: "JavaScript", percent: 95 },
            { name: "React", percent: 95 },
            { name: "Node.js", percent: 95 },
            { name: "Express", percent: 95 },
            { name: "MongoDB", percent: 95 },
            { name: "REST / GraphQL", percent: 95 },
            { name: "Next.js", percent: 80 },
            { name: "Tailwind CSS", percent: 70 },
        ],
    },
    {
        id: "software",
        title: "Software Development",
        skills: [
            { name: "Python", percent: 90 },
            { name: "Java", percent: 80 },
            { name: "SQL & Databases", percent: 80 },
            { name: "Docker", percent: 80 },
            { name: "Linux / Bash", percent: 75 },
            { name: "C++", percent: 50 },
            { name: "C#", percent: 40 },
        ],
    },
    {
        id: "cloud",
        title: "Cloud & Infrastructure",
        skills: [
            { name: "AWS", percent: 90 },
            { name: "Serverless / Lambda", percent: 90 },
            { name: "CI/CD (GitHub Actions)", percent: 70 },
            { name: "Kubernetes", percent: 45 },
        ],
    },
    {
        id: "gamedev",
        title: "Game Development (Aspiring)",
        skills: [
            { name: "Unity (C#)", percent: 30 },
            { name: "Unreal Engine (C++)", percent: 25 },
        ],
    },
    {
        id: "tools",
        title: "Development Tools",
        skills: [
            { name: "VS Code", percent: 95 },
            { name: "Git", percent: 95 },
            { name: "GitHub", percent: 95 },
            { name: "Bitbucket", percent: 95 },
            { name: "Postman", percent: 90 },
            { name: "Figma", percent: 90 },
        ],
    },
    {
        id: "pm",
        title: "Project Mgmt & Tech Leadership",
        skills: [
            { name: "Agile / Scrum", percent: 90 },
            { name: "Project Management", percent: 90 },
            { name: "Technical Leadership", percent: 90 },
            { name: "Mentoring & Code Review", percent: 85 },
            { name: "Monday.com", percent: 80 },
            { name: "Stakeholder Management", percent: 75 },
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

export const SKILL_CATEGORY_IDS = SKILL_CATEGORIES.map(
    (category) => category.id,
);

export function getSkillCategory(id: string): SkillCategory | undefined {
    return SKILL_CATEGORIES.find(
        (category) => category.id === id.toLowerCase(),
    );
}
