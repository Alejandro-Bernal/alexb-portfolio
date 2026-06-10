import { type FormEvent, useRef, useState } from "react";

type TerminalEntry = {
    command: string;
    output: string[];
};

const HELP_COMMANDS = [
    "help",
    "about",
    "projects",
    "skills",
    "contact",
] as const;

export function useTerminal() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<TerminalEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const runCommand = (raw: string) => {
        const command = raw.trim().toLowerCase();

        if (command === "") {
            setHistory((prev) => [...prev, { command: "", output: [] }]);
            return;
        }

        if (command === "help") {
            setHistory((prev) => [
                ...prev,
                {
                    command,
                    output: ["Available commands:", ...HELP_COMMANDS],
                },
            ]);
            return;
        }

        setHistory((prev) => [
            ...prev,
            {
                command,
                output: [
                    'Command not found: "' + command + '"',
                    'Type "help" to list available commands.',
                ],
            },
        ]);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        runCommand(input);
        setInput("");
        requestAnimationFrame(() => inputRef.current?.focus());
    };

    return {
        input,
        setInput,
        history,
        onSubmit,
        inputRef,
    };
}
