import "./Skills.css";
import { motion } from "framer-motion";
import {
    SKILL_CATEGORIES,
    getSkillCategory,
    type Skill,
} from "./skills.data";
import { buildSkillCategoriesBox } from "./skillsBox";

type SkillsListProps = {
    variant: "list";
};

type SkillsCategoryProps = {
    variant: "category";
    categoryId: string;
};

type SkillsProps = SkillsListProps | SkillsCategoryProps;

function SkillBars({ skills }: { skills: Skill[] }) {
    let skillIndex = 0;

    return (
        <ul className="skills-list">
            {skills.map((skill) => {
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
    );
}

export function SkillsList() {
    const box = buildSkillCategoriesBox(SKILL_CATEGORIES);

    return (
        <div className="skills-output" aria-label="skill categories">
            <pre className="skills-box">{box}</pre>
        </div>
    );
}

export function SkillsCategory({ categoryId }: { categoryId: string }) {
    const category = getSkillCategory(categoryId);

    if (!category) {
        return null;
    }

    return (
        <div className="skills-output" aria-label={`${category.title} skills`}>
            <p className="skills-header">{category.title}</p>
            <SkillBars skills={category.skills} />
        </div>
    );
}

export function Skills(props: SkillsProps) {
    if (props.variant === "list") {
        return <SkillsList />;
    }

    return <SkillsCategory categoryId={props.categoryId} />;
}