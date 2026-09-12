import { useCallback, useEffect, useRef, useState } from "react";
import "./BootScreen.css";

type BootStep =
    | { kind: "print"; text: string; wait?: number }
    | { kind: "type"; text: string; speed?: number; wait?: number }
    | { kind: "blank"; wait?: number }
    | { kind: "check"; label: string; wait?: number };

const SCRIPT: BootStep[] = [
    { kind: "print", text: "WELCOME TO MOOSE OS (TM) TERMLINK", wait: 180 },
    { kind: "blank", wait: 80 },
    {
        kind: "print",
        text: "Initializing Moose OS(TM) MF Boot Agent v2.3.0",
        wait: 100,
    },
    { kind: "print", text: "MOOSE-OS 23.96.0  //  PERSONNEL FILE", wait: 120 },
    { kind: "blank", wait: 40 },
    { kind: "check", label: "MEMORY CHECK", wait: 50 },
    { kind: "check", label: "STORAGE", wait: 50 },
    { kind: "check", label: "NETWORK", wait: 50 },
    { kind: "check", label: "PROFILE", wait: 80 },
    { kind: "blank", wait: 40 },
    { kind: "type", text: "> START /home/visitor/PERSONNEL.DAT", speed: 12, wait: 280 },
];

type BootScreenProps = {
    onComplete: () => void;
};

export function BootScreen({ onComplete }: BootScreenProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [fading, setFading] = useState(false);
    const skipRef = useRef(false);
    const fadingRef = useRef(false);
    const timers = useRef<number[]>([]);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    const clearTimers = () => {
        for (const id of timers.current) {
            window.clearTimeout(id);
        }
        timers.current = [];
    };

    const finish = useCallback(() => {
        if (fadingRef.current) {
            return;
        }
        fadingRef.current = true;
        skipRef.current = true;
        clearTimers();
        setFading(true);
        onCompleteRef.current();
    }, []);

    useEffect(() => {
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduced) {
            finish();
            return;
        }

        let cancelled = false;
        let step = 0;
        setLines([]);

        const wait = (ms: number) =>
            new Promise<void>((resolve) => {
                const id = window.setTimeout(resolve, ms);
                timers.current.push(id);
            });

        const writeLines = (updater: (prev: string[]) => string[]) => {
            if (cancelled || skipRef.current) {
                return;
            }
            setLines(updater);
        };

        const run = async () => {
            while (step < SCRIPT.length && !cancelled && !skipRef.current) {
                const current = SCRIPT[step];
                step += 1;

                if (current.kind === "blank") {
                    writeLines((prev) => [...prev, ""]);
                    await wait(current.wait ?? 80);
                    continue;
                }

                if (current.kind === "print") {
                    writeLines((prev) => [...prev, current.text]);
                    await wait(current.wait ?? 80);
                    continue;
                }

                if (current.kind === "type") {
                    const speed = current.speed ?? 16;
                    for (let i = 1; i <= current.text.length; i += 1) {
                        if (cancelled || skipRef.current) {
                            return;
                        }
                        const slice = current.text.slice(0, i);
                        writeLines((prev) => {
                            const next = [...prev];
                            if (i === 1) {
                                next.push(slice);
                            } else {
                                next[next.length - 1] = slice;
                            }
                            return next;
                        });
                        await wait(speed);
                    }
                    await wait(current.wait ?? 80);
                    continue;
                }

                if (current.kind === "check") {
                    const pad = current.label.padEnd(18, " ");
                    writeLines((prev) => [...prev, `${pad}[          ]`]);
                    const frames = [
                        `${pad}[##        ]`,
                        `${pad}[#####     ]`,
                        `${pad}[########  ]`,
                        `${pad}[##########] OK`,
                    ];
                    for (const frame of frames) {
                        if (cancelled || skipRef.current) {
                            return;
                        }
                        await wait(90);
                        writeLines((prev) => {
                            const next = [...prev];
                            next[next.length - 1] = frame;
                            return next;
                        });
                    }
                    await wait(current.wait ?? 80);
                }
            }

            if (!cancelled && !skipRef.current) {
                finish();
            }
        };

        void run();

        return () => {
            cancelled = true;
            clearTimers();
        };
    }, [finish]);

    useEffect(() => {
        const skip = () => finish();
        window.addEventListener("keydown", skip);
        return () => window.removeEventListener("keydown", skip);
    }, [finish]);

    return (
        <div
            className={`boot-screen${fading ? " is-done" : ""}`}
            onClick={finish}
            role="status"
            aria-live="polite"
        >
            <pre className="boot-log">
                {lines.map((line, index) => (
                    <div
                        key={index}
                        className={
                            line.startsWith(">")
                                ? "boot-cmd"
                                : line.includes(" OK")
                                  ? "boot-ok"
                                  : undefined
                        }
                    >
                        {line.length === 0 ? " " : line}
                    </div>
                ))}
                {!fading && <span className="cursor boot-cursor" />}
            </pre>
            <p className="boot-skip">Tap anywhere or press any key to skip</p>
        </div>
    );
}
