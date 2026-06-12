import "./Skills.css";

type Skill = {
    name: string;
    percent: number;
};

const SKILLS: Skill[] = [
    { name: "TypeScript", percent: 92 },
    { name: "React", percent: 90 },
    { name: "Node.js", percent: 88 },
    { name: "Express", percent: 86 },
    { name: "MongoDB", percent: 84 },
    { name: "AWS", percent: 78 },
    { name: "Docker", percent: 76 },
    { name: "Linux", percent: 82 },
];

export function Skills() {
    return (
        <div className="skills-output" aria-label="skills table">
            <p className="skills-header">Skill proficiency</p>
            <ul className="skills-list">
                {SKILLS.map((skill) => (
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
                            <span
                                className="skill-fill"
                                style={{
                                    width: `${skill.percent}%`,
                                    animationDelay: `${skill.percent * 0.01}s`,
                                }}
                            />
                        </div>
                        <span className="skill-percent">{skill.percent}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
