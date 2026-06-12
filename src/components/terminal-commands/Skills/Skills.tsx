import "./Skills.css";
import { motion } from "framer-motion";

type Skill = {
    name: string;
    percent: number;
};

type SkillCategory = {
    title: string;
    skills: Skill[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
    {
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
        title: "Cloud & Infrastructure",
        skills: [
            { name: "AWS", percent: 78 },
            { name: "CI/CD (GitHub Actions)", percent: 64 },
            { name: "Kubernetes", percent: 40 },
            { name: "Serverless / Lambda", percent: 55 },
        ],
    },
    {
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
        title: "Project Management & Technical Leadership",
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

export function Skills() {
    // Global stagger index so bars animate sequentially across all sections
    let skillIndex = 0;

    return (
        <div className="skills-output" aria-label="skills breakdown">
            <p className="skills-header">Skill Proficiency</p>

            {SKILL_CATEGORIES.map((category) => (
                <div key={category.title} className="skill-category">
                    <div className="category-header">{category.title}</div>
                    <ul className="skills-list">
                        {category.skills.map((skill) => {
                            const delay = skillIndex++ * 0.035;
                            return (
                                <li key={skill.name} className="skill-row">
                                    <span className="skill-name">{skill.name}</span>
                                    <div
                                        className="skill-bar"
                                        role="progressbar"
                                        aria-label={`${skill.name} proficiency`}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-valuenow={skill.percent}
                                    >
                                        <motion.span
                                            className="skill-fill"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${skill.percent}%` }}
                                            transition={{
                                                duration: 0.65,
                                                ease: "easeOut",
                                                delay,
                                            }}
                                        />
                                    </div>
                                    <span className="skill-percent">{skill.percent}%</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
