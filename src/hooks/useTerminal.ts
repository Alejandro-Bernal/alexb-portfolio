import { useRef, useState, type SubmitEventHandler } from "react";
import {
    applyContactStep,
    CONTACT_INPUT_HINTS,
    CONTACT_PROMPTS,
    nextContactStep,
    validateContactStep,
    type ContactStep,
} from "../components/terminal-commands/Contact/contactFlow";
import { submitContact } from "../services/ContactService";
import { type ContactPayload, type TerminalEntry } from "../types/global.types";

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
    const [contactData, setContactData] = useState<Partial<ContactPayload>>({});
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const typingTimers = useRef<number[]>([]);

    const startContactFlow = (command: string) => {
        setContactStep("name");
        setContactData({});
        setHistory((prev) => [...prev, { command, kind: "contact-start" }]);
    };

    const cancelContactFlow = (command: string) => {
        setContactStep(null);
        setContactData({});
        setHistory((prev) => [...prev, { command, kind: "contact-cancelled" }]);
    };

    const completeContactFlow = async (
        command: string,
        payload: ContactPayload,
    ) => {
        console.log("[contact] payload", payload);

        // Submit to backend
        const result = await submitContact(payload);

        setContactStep(null);
        setContactData({});
        setHistory((prev) => [
            ...prev,
            {
                command,
                kind: "contact-success",
                contactPayload: payload,
                contactDelivered: result.success,
                contactMessage: result.message,
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
                    contactStep: contactStep,
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
                contactStep: nextStep,
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

        if (command === "whoami" || command === "about") {
            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "whoami" },
            ]);
            return;
        }

        if (command === "moose") {
            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "moose" },
            ]);
            return;
        }

        if (command === "skills") {
            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "skills" },
            ]);
            return;
        }

        if (command === "projects") {
            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "projects" },
            ]);
            return;
        }

        if (command === "contact") {
            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "contact-info" },
            ]);
            return;
        }

        if (command === "contact-now") {
            startContactFlow(trimmed);
            return;
        }

        if (command === "resume") {
            setHistory((prev) => [
                ...prev,
                { command: trimmed, kind: "resume" },
            ]);
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
        const submitted = input;
        runCommand(submitted);
        setInput("");
        const launched = submitted.trim().toLowerCase();
        if (
            launched !== "moose" &&
            launched !== "skills" &&
            launched !== "projects"
        ) {
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    };

    const typeAndRun = (command: string) => {
        if (contactStep) {
            return;
        }

        for (const id of typingTimers.current) {
            window.clearTimeout(id);
        }
        typingTimers.current = [];

        const text = command.trim();
        setInput("");

        const schedule = (fn: () => void, ms: number) => {
            const id = window.setTimeout(fn, ms);
            typingTimers.current.push(id);
        };

        let i = 0;
        const step = () => {
            i += 1;
            if (i <= text.length) {
                setInput(text.slice(0, i));
                schedule(step, 38);
                return;
            }
            schedule(() => {
                runCommand(text);
                setInput("");
                if (
                    text !== "moose" &&
                    text !== "skills" &&
                    text !== "projects"
                ) {
                    requestAnimationFrame(() => inputRef.current?.focus());
                }
            }, 140);
        };

        step();
    };

    // Inside useTerminal(), replace the current inputHint definition with this:
    let inputHint = DEFAULT_INPUT_HINT;

    if (contactStep) {
        if (contactStep === "name") {
            const chars = input.length;
            inputHint = `Enter your name (${chars}/100)`;
        } else if (contactStep === "subject") {
            const chars = input.length;
            inputHint = `Subject e.g., Job Opportunity... (${chars}/150)`;
        } else if (contactStep === "message") {
            const chars = input.length;
            inputHint = `Message e.g., I'd love to chat... (${chars}/2000)`;
        } else {
            inputHint = CONTACT_INPUT_HINTS[contactStep];
        }
    }

    return {
        input,
        setInput,
        history,
        onSubmit,
        inputRef,
        inputHint,
        contactStep,
        typeAndRun,
    };
}
