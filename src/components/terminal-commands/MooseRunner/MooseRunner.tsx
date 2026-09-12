import { useEffect, useRef, useState } from "react";
import "./MooseRunner.css";

type Spike = {
    x: number;
    w: number;
    h: number;
};

type Phase = "ready" | "playing" | "dead";

type GameState = {
    phase: Phase;
    y: number;
    vy: number;
    onGround: boolean;
    spikes: Spike[];
    spawnIn: number;
    speed: number;
    distance: number;
    score: number;
};

const GROUND = 28;
const PLAYER_X = 48;
const PLAYER_SIZE = 20;
const GRAVITY = 2400;
const JUMP = -740;
const MIN_HEIGHT = 140;
const MAX_HEIGHT = 280;
const DEFAULT_HEIGHT = 200;

type MooseRunnerProps = {
    onExit: () => void;
};

function readAccent() {
    const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
    return value || "#1bff80";
}

function hitSpike(
    px: number,
    py: number,
    size: number,
    spike: Spike,
    groundY: number,
) {
    const left = spike.x;
    const right = spike.x + spike.w;
    const boxLeft = px;
    const boxRight = px + size;
    const boxBottom = py + size;

    if (boxRight <= left || boxLeft >= right) {
        return false;
    }

    const sampleX = Math.max(boxLeft, Math.min(boxRight, left + spike.w / 2));
    const t = (sampleX - left) / spike.w;
    const rise = t < 0.5 ? t / 0.5 : (1 - t) / 0.5;
    const spikeY = groundY - rise * spike.h;
    return boxBottom >= spikeY;
}

export function MooseRunner({ onExit }: MooseRunnerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<Phase>("ready");
    const [score, setScore] = useState(0);
    const controls = useRef({
        start: () => {},
        jump: () => {},
        retry: () => {},
        act: () => {},
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) {
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const state: GameState = {
            phase: "ready",
            y: 0,
            vy: 0,
            onGround: true,
            spikes: [],
            spawnIn: 0.9,
            speed: 260,
            distance: 0,
            score: 0,
        };

        let width = 640;
        let height = DEFAULT_HEIGHT;
        let raf = 0;
        let last = 0;

        const groundY = () => height - GROUND;

        const reset = () => {
            state.phase = "ready";
            state.y = groundY() - PLAYER_SIZE;
            state.vy = 0;
            state.onGround = true;
            state.spikes = [];
            state.spawnIn = 0.9;
            state.speed = 260;
            state.distance = 0;
            state.score = 0;
            setPhase("ready");
            setScore(0);
        };

        const begin = () => {
            if (state.phase === "playing") {
                return;
            }
            if (state.phase === "dead") {
                reset();
            }
            state.phase = "playing";
            setPhase("playing");
        };

        const jump = () => {
            if (state.phase !== "playing") {
                return;
            }
            if (state.onGround) {
                state.vy = JUMP;
                state.onGround = false;
            }
        };

        const act = () => {
            if (state.phase === "ready") {
                begin();
                return;
            }
            if (state.phase === "dead") {
                reset();
                begin();
                return;
            }
            jump();
        };

        controls.current = {
            start: begin,
            jump,
            retry: () => {
                reset();
                begin();
            },
            act,
        };

        const resize = () => {
            width = Math.max(240, Math.floor(wrap.clientWidth));
            const available = wrap.clientHeight || DEFAULT_HEIGHT;
            height = Math.max(
                MIN_HEIGHT,
                Math.min(MAX_HEIGHT, Math.floor(available)),
            );
            const floor = groundY() - PLAYER_SIZE;
            if (state.onGround || state.y > floor) {
                state.y = floor;
                state.vy = 0;
                state.onGround = true;
            }
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = () => {
            const accent = readAccent();
            const gy = groundY();
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = accent;
            ctx.globalAlpha = 0.45;
            ctx.beginPath();
            ctx.moveTo(0, gy + 0.5);
            ctx.lineTo(width, gy + 0.5);
            ctx.stroke();
            ctx.globalAlpha = 1;

            ctx.fillStyle = accent;
            ctx.fillRect(PLAYER_X, state.y, PLAYER_SIZE, PLAYER_SIZE);

            for (const spike of state.spikes) {
                ctx.beginPath();
                ctx.moveTo(spike.x, gy);
                ctx.lineTo(spike.x + spike.w / 2, gy - spike.h);
                ctx.lineTo(spike.x + spike.w, gy);
                ctx.closePath();
                ctx.fill();
            }
        };

        const tick = (now: number) => {
            const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
            last = now;

            if (state.phase === "playing") {
                state.vy += GRAVITY * dt;
                state.y += state.vy * dt;
                const floor = groundY() - PLAYER_SIZE;
                if (state.y >= floor) {
                    state.y = floor;
                    state.vy = 0;
                    state.onGround = true;
                }

                state.speed += 8 * dt;
                state.distance += state.speed * dt;
                const nextScore = Math.floor(state.distance / 20);
                if (nextScore !== state.score) {
                    state.score = nextScore;
                    setScore(nextScore);
                }
                state.spawnIn -= dt;

                if (state.spawnIn <= 0) {
                    state.spikes.push({
                        x: width + 10,
                        w: 14 + Math.random() * 8,
                        h: 16 + Math.random() * 16,
                    });
                    state.spawnIn = 0.85 + Math.random() * 0.9;
                }

                for (const spike of state.spikes) {
                    spike.x -= state.speed * dt;
                    if (
                        hitSpike(
                            PLAYER_X,
                            state.y,
                            PLAYER_SIZE,
                            spike,
                            groundY(),
                        )
                    ) {
                        state.phase = "dead";
                        setPhase("dead");
                    }
                }
                state.spikes = state.spikes.filter(
                    (spike) => spike.x + spike.w > -20,
                );
            }

            draw();
            raf = window.requestAnimationFrame(tick);
        };

        const onKey = (event: KeyboardEvent) => {
            if (event.code !== "Space" && event.code !== "ArrowUp") {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            act();
        };

        reset();
        resize();
        draw();
        raf = window.requestAnimationFrame(tick);

        const ro = new ResizeObserver(resize);
        ro.observe(wrap);
        const onPointer = (event: PointerEvent) => {
            event.preventDefault();
            act();
        };
        canvas.addEventListener("pointerdown", onPointer);
        window.addEventListener("keydown", onKey, true);

        return () => {
            window.cancelAnimationFrame(raf);
            ro.disconnect();
            canvas.removeEventListener("pointerdown", onPointer);
            window.removeEventListener("keydown", onKey, true);
        };
    }, []);

    const helpText =
        phase === "playing"
            ? "space / tap to jump · avoid the triangles"
            : phase === "dead"
              ? "moose down — start to retry or exit"
              : "start, space, or tap · then jump the spikes";

    return (
        <div className="moose-screen">
            <header className="moose-header">
                <p className="moose-title">MOOSE.EXE</p>
                <p className="moose-sub">wasteland runner</p>
            </header>

            <div className="moose-toolbar">
                {phase !== "playing" && (
                    <button
                        type="button"
                        className="moose-btn"
                        onClick={() =>
                            phase === "dead"
                                ? controls.current.retry()
                                : controls.current.start()
                        }
                    >
                        {phase === "dead" ? "retry" : "start"}
                    </button>
                )}
                <button type="button" className="moose-btn" onClick={onExit}>
                    exit
                </button>
                <span className="moose-score">score {score}</span>
            </div>

            <div className="moose-runner" ref={wrapRef}>
                <canvas
                    ref={canvasRef}
                    className="moose-runner-canvas"
                    tabIndex={0}
                    aria-label="Moose runner. Tap or press space to jump."
                />
            </div>

            <p className="moose-runner-help">{helpText}</p>

            <button
                type="button"
                className="moose-jump-pad"
                onPointerDown={(event) => {
                    event.preventDefault();
                    controls.current.act();
                }}
            >
                {phase === "playing"
                    ? "JUMP"
                    : phase === "dead"
                      ? "RETRY"
                      : "START"}
            </button>
        </div>
    );
}
