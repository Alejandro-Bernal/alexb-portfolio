import { useLayoutEffect, useRef } from "react";
import { useFiglet } from "../../hooks/useFiglet";

type FigletBannerProps = {
    text: string;
    font?: "Standard" | "Slant";
};

export function FigletBanner({ text, font = "Slant" }: FigletBannerProps) {
    const ascii = useFiglet(text, font);
    const containerRef = useRef<HTMLDivElement>(null);
    const preRef = useRef<HTMLPreElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const pre = preRef.current;
        if (!container || !pre) {
            return;
        }

        const fit = () => {
            pre.style.transform = "none";
            container.style.height = "auto";

            const naturalWidth = pre.scrollWidth;
            const naturalHeight = pre.scrollHeight;
            const availableWidth = container.clientWidth;

            if (naturalWidth === 0 || availableWidth === 0) {
                return;
            }

            const scale = Math.min(1, availableWidth / naturalWidth);
            pre.style.transform = `scale(${scale})`;
            container.style.height = `${naturalHeight * scale}px`;
        };

        fit();

        const observer = new ResizeObserver(fit);
        observer.observe(container);
        observer.observe(pre);
        window.addEventListener("resize", fit);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", fit);
        };
    }, [ascii]);

    return (
        <div ref={containerRef} className="figlet-wrap">
            <pre ref={preRef} className="figlet" aria-label={text}>
                {ascii}
            </pre>
        </div>
    );
}