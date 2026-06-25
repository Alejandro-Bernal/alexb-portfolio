import "./Contact.css";
import { type ContactPayload } from "../../../types/global.types";
import { CONTACT_PROMPTS } from "./contactFlow";

type ContactPromptProps = {
    prompt: string;
    error?: string;
};

export function ContactPrompt({ prompt, error }: ContactPromptProps) {
    return (
        <div className="contact-flow">
            {error ? <p className="contact-error">{error}</p> : null}
            <p className="contact-prompt">{prompt}</p>
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
            <ContactPrompt prompt={CONTACT_PROMPTS.name} />
        </div>
    );
}

export function ContactSuccess({ payload }: { payload: ContactPayload }) {
    return (
        <div className="contact-flow">
            <p className="contact-success">
                Message captured locally. FastAPI delivery service coming soon.
            </p>
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

