import "./Contact.css";
import {
    type ContactPayload,
    type ContactStep,
} from "../../../types/global.types";
import { CONTACT_PROMPTS, CONTACT_NOTES } from "./contactFlow";

type ContactPromptProps = {
    prompt: string;
    error?: string;
    step?: ContactStep;
};

export function ContactPrompt({ prompt, error, step }: ContactPromptProps) {
    const note = step ? CONTACT_NOTES[step] : null;

    return (
        <div className="contact-flow">
            {error ? <p className="contact-error">{error}</p> : null}
            <p className="contact-prompt">{prompt}</p>
            {note ? <p className="contact-note">{note}</p> : null}
        </div>
    );
}

export function ContactStart() {
    return (
        <div className="contact-flow">
            <p className="contact-intro">
                Interactive contact form — answer each prompt below.
            </p>
            <p className="contact-tip">
                Type <span className="cmd">cancel</span> at any time to exit.
            </p>

            <div className="contact-privacy">
                <p className="contact-privacy-notice">
                    By submitting this form, you agree to our{" "}
                    <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-privacy-link"
                    >
                        Privacy Policy
                    </a>
                    . Your name and email will be stored securely so I can
                    contact you back.
                </p>
            </div>

            <ContactPrompt prompt={CONTACT_PROMPTS.name} step="name" />
        </div>
    );
}

export function ContactSuccess({
    payload,
    delivered,
    message,
}: {
    payload: ContactPayload;
    delivered?: boolean;
    message?: string;
}) {
    const status = delivered ? "Delivered" : "Failed to deliver";
    const statusClass = delivered ? "contact-delivered" : "contact-failed";

    return (
        <div className="contact-flow">
            <p className={`contact-status ${statusClass}`}>{status}</p>
            {message && <p className="contact-message">{message}</p>}
            <div className="contact-summary">
                <div>
                    From: {payload.name} ({payload.email})
                </div>
                <div>Subject: {payload.subject}</div>
                <div>Message: {payload.message}</div>
            </div>
        </div>
    );
}

export function ContactCancelled() {
    return (
        <div className="contact-flow">
            <p>Contact form cancelled.</p>
        </div>
    );
}

export function ContactArgsHint() {
    return (
        <div className="contact-flow">
            <p>
                <span className="cmd">contact</span> runs interactively — no
                arguments needed.
            </p>
            <p className="contact-tip">
                Just type <span className="cmd">contact</span> and follow the
                prompts.
            </p>
        </div>
    );
}
