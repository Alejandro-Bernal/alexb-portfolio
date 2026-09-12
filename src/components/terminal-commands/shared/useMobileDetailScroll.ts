import { useCallback, useRef } from "react";

const MOBILE_STACK = "(max-width: 860px)";

function scrollDetailIntoView(
    container: HTMLElement,
    detail: HTMLElement,
    smooth: boolean,
) {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }

    const header = container.querySelector("header");
    const headerHeight =
        header instanceof HTMLElement
            ? header.getBoundingClientRect().height
            : 0;
    const containerRect = container.getBoundingClientRect();
    const detailRect = detail.getBoundingClientRect();
    const nextTop =
        container.scrollTop +
        (detailRect.top - containerRect.top) -
        headerHeight -
        10;

    container.scrollTo({
        top: Math.max(0, nextTop),
        behavior: smooth ? "smooth" : "auto",
    });
}

export function useMobileDetailScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLElement>(null);

    const revealDetail = useCallback(() => {
        if (!window.matchMedia(MOBILE_STACK).matches) {
            return;
        }

        const container = containerRef.current;
        const detail = detailRef.current;
        if (!container || !detail) {
            return;
        }

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const smooth = !reduceMotion;
        const run = () => scrollDetailIntoView(container, detail, smooth);

        window.setTimeout(run, 40);
        window.setTimeout(run, 280);
    }, []);

    return { containerRef, detailRef, revealDetail };
}
