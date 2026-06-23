import { useMemo } from "react";
import figlet from "figlet";
import standard from "figlet/importable-fonts/Standard.js";
import slant from "figlet/importable-fonts/Slant.js";

figlet.parseFont("Standard", standard);
figlet.parseFont("Slant", slant);

export function useFiglet(text: string, font: "Standard" | "Slant" = "Slant") {
    return useMemo(() => {
        try {
            return figlet.textSync(text, {
                font,
                horizontalLayout: "fitted",
                verticalLayout: "default",
            });
        } catch (e) {
            console.error("Figlet error:", e);
            return text; // fallback to plain text
        }
    }, [text, font]);
}
