import "./TypedText.css";

interface TypedTextProps {
    text: string;
    className?: string;
    showCursor?: boolean;
}

export function TypedText({
    text,
    className = "",
    showCursor = false,
}: TypedTextProps) {
    return (
        <span className={className}>
            {text}
            {showCursor && <span className="cursor" aria-hidden="true" />}
        </span>
    );
}
