import { useEffect, useState } from "react";

type TypedSequenceOptions = {
    active?: boolean;
    speed?: number;
    linePause?: number;
};

export function useTypedSequence(
    items: readonly string[],
    options: TypedSequenceOptions = {},
) {
    const { active = true, speed = 18, linePause = 90 } = options;
    const [index, setIndex] = useState(0);
    const [char, setChar] = useState(0);

    const instant = !active ? false : speed === 0;
    const done = instant || index >= items.length;

    useEffect(() => {
        if (!active || instant) {
            return;
        }
        if (index >= items.length) {
            return;
        }

        const current = items[index] ?? "";
        if (char < current.length) {
            const timer = window.setTimeout(() => {
                setChar((value) => value + 1);
            }, speed);
            return () => window.clearTimeout(timer);
        }

        const timer = window.setTimeout(() => {
            setIndex((value) => value + 1);
            setChar(0);
        }, linePause);
        return () => window.clearTimeout(timer);
    }, [active, instant, index, char, items, speed, linePause]);

    const textAt = (itemIndex: number) => {
        if (!active) {
            return "";
        }
        if (instant || itemIndex < index) {
            return items[itemIndex] ?? "";
        }
        if (itemIndex === index) {
            return (items[itemIndex] ?? "").slice(0, char);
        }
        return "";
    };

    const started = (itemIndex: number) =>
        active && (instant || index >= itemIndex);

    const completed = (itemIndex: number) =>
        active && (instant || index > itemIndex);

    const isTyping = (itemIndex: number) =>
        active && !instant && index === itemIndex && index < items.length;

    return {
        textAt,
        started,
        completed,
        isTyping,
        isComplete: done,
        activeIndex: index,
    };
}
