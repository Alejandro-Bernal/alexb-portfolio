import "./TypedText.css";

interface TypedTextProps {
    text: string;
    className?: string;
    showCursor?: boolean;
}

export function TypedText({
    text,
    className = "",
    showCursor = false, // Default to false
}: TypedTextProps) {
    return (
        <span className={className}>
            {text}
            {showCursor && <span className="cursor">|</span>}
        </span>
    );
}