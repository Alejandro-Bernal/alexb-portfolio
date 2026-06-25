import { useRef, useState, type SubmitEventHandler } from "react";
import {
    applyContactStep,
    CONTACT_INPUT_HINTS,
    CONTACT_PROMPTS,
    nextContactStep,
    validateContactStep,
    type ContactStep,
} from "../components/terminal-commands/Contact/contactFlow";
import { getProject } from "../components/terminal-commands/Projects/projects.data";
import { getSkillCategory } from "../components/terminal-commands/Skills/skills.data";
import {
    type ContactPayload,
    type TerminalEntry,
} from "../types/global.types";

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

const DEFAULT_INPUT_HINT = 'Type "help" and press Enter';

export function useTerminal() {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<TerminalEntry[]>([]);
    const [contactStep, setContactStep] = useState<ContactStep | null>(null);
    const [contactData, setContactData] = useState<Partial<ContactPayload>>(
        {},
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const startContactFlow = (command: string) => {
        setContactStep("name");
        setContactData({});
        setHistory((prev) => [
            ...prev,
            { command, kind: "contact-start" },
        ]);
    };

    const cancelContactFlow = (command: string) => {
        setContactStep(null);
        setContactData({});
        setHistory((prev) => [
            ...prev,
            { command, kind: "contact-cancelled" },
        ]);
    };

    const completeContactFlow = (
        command: string,
        payload: ContactPayload,
    ) => {
        console.log("[contact] payload", payload);

        setContactStep(null);
        setContactData({});
        setHistory((prev) => [
            ...prev,
            {
                command,
                kind: "contact-success",
                contactPayload: payload,
            },
        ]);
    };

    const handleContactInput = (raw: string) => {
        const trimmed = raw.trim();

        if (trimmed.toLowerCase() === "cancel") {
            cancelContactFlow(trimmed);
            return;
        }

        if (!contactStep) {
            return;
        }

        const validation = validateContactStep(contactStep, raw, contactData);

        if (!validation.ok) {
            setHistory((prev) => [
                ...prev,
                {
                    command: trimmed,
                    kind: "contact-error",
                    contactPrompt: CONTACT_PROMPTS[contactStep],
                    contactError: validation.error,
                },
            ]);
            return;
        }

        const updatedData = applyContactStep(contactStep, raw, contactData);
        setContactData(updatedData);

        const nextStep = nextContactStep(contactStep);

        if (nextStep === "done") {
            completeContactFlow(trimmed, updatedData as ContactPayload);
            return;
        }

        setContactStep(nextStep);
        setHistory((prev) => [
            ...prev,
            {
                command: trimmed,
                kind: "contact-prompt",
                contactPrompt: CONTACT_PROMPTS[nextStep],
            },
        ]);
    };

    const runCommand = (raw: string) => {
        const trimmed = raw.trim();

        if (contactStep) {
            handleContactInput(raw);
            return;
        }

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

            if (args.length > 0) {
                setHistory((prev) => [
                    ...prev,
                    { command: trimmed, kind: "contact-args" },
                ]);
                return;
            }

            startContactFlow(trimmed);
            return;
        }

        if (command === "clear") {
            setHistory([]);
            setContactStep(null);
            setContactData({});
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