import "./Skills.css";
import "../Help/HelpOutput.css";
import { motion } from "framer-motion";
import {
    SKILL_CATEGORIES,
    getSkillCategory,
    type Skill,
} from "./skills.data";

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

function SkillCategoryRow({
    id,
    title,
    skillCount,
}: {
    id: string;
    title: string;
    skillCount: number;
}) {
    return (
        <li className="help-row">
            <span className="help-cmd">{id}</span>
            <div className="help-desc-block">
                <span className="help-desc">{title}</span>
                <span className="help-note">
                    ({skillCount} {skillCount === 1 ? "skill" : "skills"})
                </span>
            </div>
        </li>
    );
}

export function SkillsList() {
    return (
        <div className="help-output" aria-label="skill categories">
            <p className="help-name">
                <span className="cmd">skills</span>
            </p>

            <div className="help-section">
                <p className="help-section-title">Categories</p>
                <ul className="help-table">
                    {SKILL_CATEGORIES.map((category) => (
                        <SkillCategoryRow
                            key={category.id}
                            id={category.id}
                            title={category.title}
                            skillCount={category.skills.length}
                        />
                    ))}
                </ul>
            </div>

            <div className="help-section">
                <p className="help-section-title">Usage</p>
                <ul className="help-table">
                    <li className="help-row">
                        <span className="help-cmd">skills &lt;category&gt;</span>
                        <div className="help-desc-block">
                            <span className="help-desc">
                                view proficiency for a category
                            </span>
                            <span className="help-note">
                                e.g. skills fullstack
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
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