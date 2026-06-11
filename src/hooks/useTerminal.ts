import { useRef, useState, type SubmitEventHandler } from "react";
import { type TerminalEntry } from "../types/global.types";

export function useTerminal() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<TerminalEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const runCommand = (raw: string) => {
        const command = raw.trim().toLowerCase();

        if (command === "") {
            setHistory((prev) => [...prev, { command: "", kind: "empty" }]);
            return;
        }

        if (command === "help") {
            setHistory((prev) => [...prev, { command, kind: "help" }]);
            return;
        }

        if (command === "clear") {
            setHistory([]);
            return;
        }

        setHistory((prev) => [...prev, { command, kind: "unknown" }]);
    };

    const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
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
