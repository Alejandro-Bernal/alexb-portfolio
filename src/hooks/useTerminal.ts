import { useRef, useState, type SubmitEventHandler } from "react";
import { getProject } from "../components/terminal-commands/Projects/projects.data";
import { getSkillCategory } from "../components/terminal-commands/Skills/skills.data";
import { type TerminalEntry } from "../types/global.types";

function tokenizeCommand(input: string): string[] {
    const tokens = input.match(/"[^"]*"|'[^']*'|\S+/g) ?? [];

    return tokens.map((token) => {
        if (
            (token.startsWith('"') && token.endsWith('"')) ||
            (token.startsWith("'") && token.endsWith("'"))
        ) {
            return token.slice(1, -1);
        }

        return token;
    });
}

export function useTerminal() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<TerminalEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const runCommand = (raw: string) => {
        const trimmed = raw.trim();

        if (trimmed === "") {
            setHistory((prev) => [...prev, { command: "", kind: "empty" }]);
            return;
        }

        const tokens = tokenizeCommand(trimmed);
        const command = (tokens[0] ?? "").toLowerCase();

        if (command === "help") {
            setHistory((prev) => [...prev, { command: trimmed, kind: "help" }]);
            return;
        }

        if (command === "about") {
            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "about" },
            ]);
            return;
        }

        if (command === "skills") {
            const args = tokens.slice(1);
            const subcommand = (args[0] ?? "").toLowerCase();

            if (subcommand === "" || subcommand === "list") {
                setHistory((prev) => [
                    ...prev,
                    { command: trimmed, kind: "skills-list" },
                ]);
                return;
            }

            const category = getSkillCategory(subcommand);

            if (category) {
                setHistory((prev) => [
                    ...prev,
                    {
                        command: trimmed,
                        kind: "skills-category",
                        skillsCategory: category.id,
                    },
                ]);
                return;
            }

            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "skills-usage" },
            ]);
            return;
        }

        if (command === "projects") {
            const args = tokens.slice(1);
            const subcommand = (args[0] ?? "").toLowerCase();

            if (subcommand === "" || subcommand === "list") {
                setHistory((prev) => [
                    ...prev,
                    { command: trimmed, kind: "projects-list" },
                ]);
                return;
            }

            const project = getProject(subcommand);

            if (project) {
                setHistory((prev) => [
                    ...prev,
                    {
                        command: trimmed,
                        kind: "projects-detail",
                        projectId: project.id,
                    },
                ]);
                return;
            }

            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "projects-usage" },
            ]);
            return;
        }

        if (command === "contact") {
            const args = tokens.slice(1);

            if (args.length < 4) {
                setHistory((prev) => [
                    ...prev,
                    { command: trimmed, kind: "contact-usage" },
                ]);
                return;
            }

            const [name, email, subject, ...messageParts] = args;
            const message = messageParts.join(" ");

            const contactPayload = {
                name,
                email,
                subject,
                message,
            };

            console.log("[contact] payload", contactPayload);

            setHistory((prev) => [
                ...prev,
                {
                    command: trimmed,
                    kind: "contact-success",
                    contactPayload,
                },
            ]);
            return;
        }

        if (command === "clear") {
            setHistory([]);
            return;
        }

        setHistory((prev) => [...prev, { command: trimmed, kind: "unknown" }]);
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