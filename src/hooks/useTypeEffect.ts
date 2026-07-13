import { useState, useEffect } from "react";

interface UseTypeEffectOptions {
    speed?: number;
    startOnMount?: boolean; // Controls when to start animating
}

export function useTypeEffect(
    text: string,
    options: UseTypeEffectOptions = {},
) {
    const { speed = 25, startOnMount = true } = options;
    const [animatedText, setAnimatedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Do nothing if we shouldn't start yet, OR if speed is 0 (handled below)
        if (!startOnMount || speed === 0) {
            return;
        }

        let index = 0;
        let timer: ReturnType<typeof setTimeout>;

        // When starting/restarting, initialize the first text step inside the timeout callback
        const animate = () => {
            index += 1;
            setAnimatedText(text.slice(0, index));

            if (index < text.length) {
                timer = setTimeout(animate, speed);
            } else {
                setIsComplete(true);
            }
        };

        // Start the animation loop
        timer = setTimeout(animate, speed);

        return () => clearTimeout(timer);
    }, [text, speed, startOnMount]);

    // Derive the final displayed text during render, completely avoiding sync setState
    let displayedText = animatedText;

    if (!startOnMount) {
        displayedText = "";
    } else if (speed === 0) {
        displayedText = text;
    }

    // Derive the complete status similarly
    const actualIsComplete = !startOnMount
        ? false
        : speed === 0
          ? true
          : isComplete;

    return { displayedText, isComplete: actualIsComplete };
}
