import { type ContactPayload } from "../../../types/global.types";

export type ContactStep = "name" | "email" | "emailConfirm" | "subject" | "message";

export const CONTACT_STEPS: ContactStep[] = [
    "name",
    "email",
    "emailConfirm",
    "subject",
    "message",
];

export const CONTACT_PROMPTS: Record<ContactStep, string> = {
    name: "What is your name?",
    email: "What is your email address?",
    emailConfirm: "Please confirm your email address:",
    subject: "What is the subject?",
    message: "Write your message:",
};

export const CONTACT_INPUT_HINTS: Record<ContactStep, string> = {
    name: "Enter your name",
    email: "Enter your email",
    emailConfirm: "Re-enter your email",
    subject: "Enter a subject",
    message: "Enter your message",
};

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContactStep(
    step: ContactStep,
    value: string,
    data: Partial<ContactPayload>,
): { ok: true } | { ok: false; error: string } {
    const trimmed = value.trim();

    switch (step) {
        case "name":
            if (!trimmed) {
                return { ok: false, error: "Name cannot be empty." };
            }
            return { ok: true };
        case "email":
            if (!trimmed) {
                return { ok: false, error: "Email cannot be empty." };
            }
            if (!isValidEmail(trimmed)) {
                return {
                    ok: false,
                    error: "Please enter a valid email address.",
                };
            }
            return { ok: true };
        case "emailConfirm":
            if (!trimmed) {
                return { ok: false, error: "Email cannot be empty." };
            }
            if (trimmed !== data.email) {
                return {
                    ok: false,
                    error: "Emails do not match. Please try again.",
                };
            }
            return { ok: true };
        case "subject":
            if (!trimmed) {
                return { ok: false, error: "Subject cannot be empty." };
            }
            return { ok: true };
        case "message":
            if (!trimmed) {
                return { ok: false, error: "Message cannot be empty." };
            }
            return { ok: true };
    }
}

export function nextContactStep(
    step: ContactStep,
): ContactStep | "done" {
    const index = CONTACT_STEPS.indexOf(step);

    if (index === CONTACT_STEPS.length - 1) {
        return "done";
    }

    return CONTACT_STEPS[index + 1];
}

export function applyContactStep(
    step: ContactStep,
    value: string,
    data: Partial<ContactPayload>,
): Partial<ContactPayload> {
    const trimmed = value.trim();

    switch (step) {
        case "name":
            return { ...data, name: trimmed };
        case "email":
            return { ...data, email: trimmed };
        case "emailConfirm":
            return data;
        case "subject":
            return { ...data, subject: trimmed };
        case "message":
            return { ...data, message: trimmed };
    }
}