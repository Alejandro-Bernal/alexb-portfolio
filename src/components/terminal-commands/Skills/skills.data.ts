export type Skill = {
    name: string;
    percent: number;
};

export type SpecialId = "str" | "per" | "end" | "cha" | "int" | "agi" | "lck";

export type SpecialStat = {
    id: SpecialId;
    code: "STR" | "PER" | "END" | "CHA" | "INT" | "AGI" | "LCK";
    name: string;
    group: string;
    blurb: string;
    value: number;
    skills: Skill[];
};

export const SPECIAL_STATS: SpecialStat[] = [
    {
        id: "str",
        code: "STR",
        name: "Strength",
        group: "Programming languages",
        blurb: "Raw coding power — the languages I actually ship in.",
        value: 8,
        skills: [
            { name: "TypeScript", percent: 95 },
            { name: "JavaScript", percent: 95 },
            { name: "Python", percent: 90 },
            { name: "Java", percent: 80 },
            { name: "C++", percent: 50 },
            { name: "C#", percent: 40 },
        ],
    },
    {
        id: "per",
        code: "PER",
        name: "Perception",
        group: "Tools",
        blurb: "What I use to see bugs, inspect APIs, and stay sharp.",
        value: 9,
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
        id: "end",
        code: "END",
        name: "Endurance",
        group: "Cloud & infrastructure",
        blurb: "Keeping systems up — AWS, containers, pipelines, on-call.",
        value: 8,
        skills: [
            { name: "AWS", percent: 90 },
            { name: "Serverless / Lambda", percent: 90 },
            { name: "Docker", percent: 80 },
            { name: "Linux / Bash", percent: 75 },
            { name: "CI/CD (GitHub Actions)", percent: 70 },
            { name: "Kubernetes", percent: 45 },
        ],
    },
    {
        id: "cha",
        code: "CHA",
        name: "Charisma",
        group: "Soft skills",
        blurb: "Working with people: teaching, reviews, and staying calm.",
        value: 8,
        skills: [
            { name: "Problem Solving", percent: 89 },
            { name: "Team Collaboration", percent: 86 },
            { name: "Mentoring & Code Review", percent: 85 },
            { name: "Communication", percent: 84 },
            { name: "Adaptability", percent: 82 },
            { name: "Time Management", percent: 77 },
        ],
    },
    {
        id: "int",
        code: "INT",
        name: "Intelligence",
        group: "Frameworks & architecture",
        blurb: "How I assemble languages into real products.",
        value: 9,
        skills: [
            { name: "React", percent: 95 },
            { name: "Node.js", percent: 95 },
            { name: "Express", percent: 95 },
            { name: "MongoDB", percent: 95 },
            { name: "REST / GraphQL", percent: 95 },
            { name: "SQL & Databases", percent: 80 },
            { name: "Next.js", percent: 80 },
            { name: "Tailwind CSS", percent: 70 },
        ],
    },
    {
        id: "agi",
        code: "AGI",
        name: "Agility",
        group: "Project management",
        blurb: "Shipping: agile, leadership, and getting work out the door.",
        value: 8,
        skills: [
            { name: "Agile / Scrum", percent: 90 },
            { name: "Project Management", percent: 90 },
            { name: "Technical Leadership", percent: 90 },
            { name: "Monday.com", percent: 80 },
            { name: "Stakeholder Management", percent: 75 },
        ],
    },
    {
        id: "lck",
        code: "LCK",
        name: "Luck",
        group: "Game development",
        blurb: "Side quests and easter eggs. Still leveling up.",
        value: 3,
        skills: [
            { name: "Unity (C#)", percent: 30 },
            { name: "Unreal Engine (C++)", percent: 25 },
        ],
    },
];
