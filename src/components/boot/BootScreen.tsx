import { useCallback, useEffect, useRef, useState } from "react";
import "./BootScreen.css";

type BootStep =
    | { kind: "print"; text: string; wait?: number }
    | { kind: "type"; text: string; speed?: number; wait?: number }
    | { kind: "blank"; wait?: number }
    | { kind: "check"; label: string; wait?: number };

const SCRIPT: BootStep[] = [
    { kind: "print", text: "WELCOME TO MOOSE OS (TM) TERMLINK", wait: 280 },
    { kind: "blank", wait: 180 },
    { kind: "type", text: "> SET TERMINAL/INQUIRE", speed: 16, wait: 220 },
    { kind: "print", text: "BERNALFORGE-V323", wait: 200 },
    { kind: "blank", wait: 120 },
    {
        kind: "type",
        text: "> SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F",
        speed: 12,
        wait: 80,
    },
    { kind: "type", text: "> SET HALT RESTART/MAINT", speed: 14, wait: 260 },
    { kind: "blank", wait: 80 },
    {
        kind: "print",
        text: "Initializing Moose OS(TM) MF Boot Agent v2.3.0",
        wait: 140,
    },
    { kind: "print", text: "RETROS BIOS", wait: 80 },
    { kind: "print", text: "RBIOS-4.02.08.00 52EE5.E7.E8", wait: 80 },
    { kind: "print", text: "Copyright 2201-2203 Moose OS", wait: 80 },
    { kind: "print", text: "Uppermem: 64 KB", wait: 80 },
    { kind: "print", text: "Root (5A8)", wait: 80 },
    { kind: "print", text: "Maintenance Mode", wait: 220 },
    { kind: "blank", wait: 80 },
    { kind: "type", text: "> RUN MOOSE-OS.SYS", speed: 16, wait: 280 },
    { kind: "print", text: "********************************************", wait: 40 },
    {
        kind: "print",
        text: "*  MOOSE-OS 23.96.0  //  VAULT-323         *",
        wait: 40,
    },
    {
        kind: "print",
        text: "*  PERSONNEL FILE: ALEJANDRO BERNAL        *",
        wait: 40,
    },
    { kind: "print", text: "********************************************", wait: 220 },
    { kind: "blank", wait: 60 },
    { kind: "check", label: "MEMORY CHECK", wait: 80 },
    { kind: "check", label: "STORAGE", wait: 80 },
    { kind: "check", label: "NETWORK", wait: 80 },
    { kind: "check", label: "PROFILE", wait: 180 },
    { kind: "blank", wait: 80 },
    { kind: "type", text: "> START /home/visitor/PERSONNEL.DAT", speed: 14, wait: 700 },
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
            <p className="boot-skip">Press any key or click to skip</p>
        </div>
    );
}
