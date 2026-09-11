import { useLayoutEffect, useRef } from "react";

const BASE_FONT_SIZE_PX = 72;

type FigletBannerProps = {
    text: string;
};

function measureIntrinsicWidth(heading: HTMLElement) {
    const clone = heading.cloneNode(true) as HTMLElement;
    clone.style.cssText = [
        "position:absolute",
        "visibility:hidden",
        "left:-9999px",
        "top:0",
        `font-size:${BASE_FONT_SIZE_PX}px`,
        "font-weight:700",
        "font-style:normal",
        "white-space:nowrap",
        "width:auto",
        "max-width:none",
        "height:auto",
        "letter-spacing:0.04em",
        "line-height:0.9",
        "margin:0",
        "padding:0",
    ].join(";");
    document.body.appendChild(clone);
    const width = clone.getBoundingClientRect().width;
    clone.remove();
    return width;
}

export function FigletBanner({ text }: FigletBannerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const heading = headingRef.current;
        if (!container || !heading) {
            return;
        }

        const fit = () => {
            const naturalWidth = measureIntrinsicWidth(heading);
            const availableWidth = Math.min(
                container.clientWidth,
                container.parentElement?.clientWidth ?? Number.POSITIVE_INFINITY,
                document.documentElement.clientWidth,
            );

            if (naturalWidth === 0 || availableWidth === 0) {
                return;
            }

            const nextSize = BASE_FONT_SIZE_PX * (availableWidth / naturalWidth);
            heading.style.fontSize = `${Math.min(nextSize, 160)}px`;
        };

        fit();

        let cancelled = false;
        const fonts = document.fonts;
        fonts?.ready.then(() => {
            if (!cancelled) {
                fit();
            }
        });
        fonts?.addEventListener("loadingdone", fit);

        const observer = new ResizeObserver(fit);
        observer.observe(container);
        window.addEventListener("resize", fit);

        return () => {
            cancelled = true;
            fonts?.removeEventListener("loadingdone", fit);
            observer.disconnect();
            window.removeEventListener("resize", fit);
        };
    }, [text]);

    return (
        <div ref={containerRef} className="figlet-wrap">
            <h1 ref={headingRef} className="figlet">
                {text}
            </h1>
        </div>
    );
}
