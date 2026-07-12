import type { ContactPayload } from "../types/global.types";

const API_URL =
    import.meta.env.VITE_BACKEND_API_URL || "http://127.0.0.1:8000/contact";
const API_KEY = import.meta.env.VITE_API_KEY || "";

export async function submitContact(
    payload: ContactPayload,
): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
            body: JSON.stringify({
                name: payload.name,
                email: payload.email,
                subject: payload.subject,
                message: payload.message,
            }),
        });

        if (!response.ok) {
            const error = await response
                .json()
                .catch(() => ({ detail: "Unknown error" }));
            const message = error.detail || `HTTP ${response.status}`;
            return { success: false, message };
        }

        return { success: true, message: "Message delivered successfully!" };
    } catch (err) {
        console.error("[Contact API Error]", err);
        const message = err instanceof Error ? err.message : "Network error";
        return { success: false, message };
    }
}
