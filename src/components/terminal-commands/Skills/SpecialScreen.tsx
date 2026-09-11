import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SPECIAL_STATS, type SpecialId, type Skill } from "./skills.data";
import "./SpecialScreen.css";

type SpecialScreenProps = {
    onExit: () => void;
};

function SkillBars({ skills }: { skills: Skill[] }) {
    return (
        <ul className="special-skill-list">
            {skills.map((skill, index) => (
                <li key={skill.name} className="special-skill-row">
                    <span className="special-skill-name">{skill.name}</span>
                    <div
                        className="special-skill-bar"
                        role="progressbar"
                        aria-label={`${skill.name} proficiency`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={skill.percent}
                    >
                        <motion.span
                            className="special-skill-fill"
                            initial={{ width: "0%" }}
                            animate={{ width: `${skill.percent}%` }}
                            transition={{
                                duration: 0.55,
                                ease: "easeOut",
                                delay: index * 0.04,
                            }}
                        />
                    </div>
                    <span className="special-skill-pct">{skill.percent}%</span>
                </li>
            ))}
        </ul>
    );
}

export function SpecialScreen({ onExit }: SpecialScreenProps) {
    const [selected, setSelected] = useState<SpecialId>("str");
    const stat = SPECIAL_STATS.find((item) => item.id === selected) ?? SPECIAL_STATS[0];

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                event.preventDefault();
                onExit();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onExit]);

    return (
        <div className="special-screen">
            <header className="special-header">
                <div>
                    <p className="special-exe">SPECIAL.EXE</p>
                    <p className="special-sub">
                        S.P.E.C.I.A.L. personnel file — click an attribute
                    </p>
                </div>
                <button type="button" className="special-exit" onClick={onExit}>
                    exit
                </button>
            </header>

            <div className="special-body">
                <nav className="special-nav" aria-label="SPECIAL attributes">
                    {SPECIAL_STATS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={
                                item.id === selected
                                    ? "special-attr is-active"
                                    : "special-attr"
                            }
                            onClick={() => setSelected(item.id)}
                        >
                            <span className="special-attr-code">{item.code}</span>
                            <span className="special-attr-name">{item.name}</span>
                            <span className="special-attr-pips" aria-hidden="true">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <span
                                        key={index}
                                        className={
                                            index < item.value
                                                ? "special-pip is-filled"
                                                : "special-pip"
                                        }
                                    />
                                ))}
                            </span>
                        </button>
                    ))}
                </nav>

                <section className="special-detail" aria-live="polite">
                    <p className="special-detail-kicker">
                        {stat.code} // {stat.group.toUpperCase()}
                    </p>
                    <h2 className="special-detail-title">{stat.name}</h2>
                    <p className="special-detail-blurb">{stat.blurb}</p>
                    <SkillBars skills={stat.skills} />
                </section>
            </div>
        </div>
    );
}
