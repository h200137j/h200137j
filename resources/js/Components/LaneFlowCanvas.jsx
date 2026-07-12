import { useEffect, useRef } from 'react';

/**
 * LUMINA lane-flow — a living miniature of the award-winning lane
 * utilization algorithm. Vehicles stream along lanes; the cursor is a
 * congestion zone, and traffic reroutes into freer lanes around it.
 */
export default function LaneFlowCanvas({ dark }) {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: null, y: null });
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let lanes = [];
        let vehicles = [];
        let last = performance.now();

        const build = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;

            const laneCount = Math.max(5, Math.floor(canvas.height / 130));
            const gap = canvas.height / (laneCount + 1);
            lanes = Array.from({ length: laneCount }, (_, i) => gap * (i + 1));

            const count = reduceMotion ? 0 : Math.floor(canvas.width / 34);
            vehicles = Array.from({ length: count }, () => {
                const lane = Math.floor(Math.random() * laneCount);
                return {
                    x: Math.random() * canvas.width,
                    lane,
                    y: lanes[lane],
                    speed: 30 + Math.random() * 70,           // px per second
                    len: 10 + Math.random() * 22,
                    sunny: Math.random() < 0.16,              // priority vehicles glow amber
                    alpha: 0.25 + Math.random() * 0.5,
                };
            });
        };

        const laneDensity = (laneIdx, nearX) =>
            vehicles.reduce((n, v) => (v.lane === laneIdx && Math.abs(v.x - nearX) < 200 ? n + 1 : n), 0);

        const drawLanes = () => {
            ctx.setLineDash([6, 14]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = dark ? 'rgba(178,148,250,0.10)' : 'rgba(102,64,190,0.10)';
            lanes.forEach((y) => {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            });
            ctx.setLineDash([]);
        };

        const draw = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawLanes();

            const mx = mouse.current.x;
            const my = mouse.current.y;

            vehicles.forEach((v) => {
                const laneY = lanes[v.lane];

                // Congestion ahead? Reroute — the LUMINA move.
                if (mx !== null) {
                    const ahead = mx - v.x;
                    const nearCursorLane = Math.abs(laneY - my) < 55;
                    if (nearCursorLane && ahead > 0 && ahead < 170) {
                        const up = v.lane - 1;
                        const down = v.lane + 1;
                        let target = v.lane;
                        if (up >= 0 && down < lanes.length) {
                            target = laneDensity(up, v.x) <= laneDensity(down, v.x) ? up : down;
                        } else if (up >= 0) {
                            target = up;
                        } else if (down < lanes.length) {
                            target = down;
                        }
                        v.lane = target;
                    }
                }

                // Ease toward assigned lane
                v.y += (lanes[v.lane] - v.y) * Math.min(1, dt * 6);
                v.x += v.speed * dt;
                if (v.x - v.len > canvas.width) v.x = -v.len;

                const color = v.sunny
                    ? (dark ? `rgba(255,176,60,${v.alpha})` : `rgba(196,119,11,${v.alpha * 0.9})`)
                    : (dark ? `rgba(178,148,250,${v.alpha * 0.8})` : `rgba(122,79,214,${v.alpha * 0.55})`);

                ctx.beginPath();
                ctx.lineCap = 'round';
                ctx.lineWidth = 2.4;
                ctx.strokeStyle = color;
                ctx.moveTo(v.x - v.len, v.y);
                ctx.lineTo(v.x, v.y);
                ctx.stroke();
            });

            animRef.current = requestAnimationFrame(draw);
        };

        const onMouse = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onLeave = () => { mouse.current = { x: null, y: null }; };

        build();
        window.addEventListener('resize', build);
        window.addEventListener('mousemove', onMouse);
        canvas.parentElement.addEventListener('mouseleave', onLeave);

        if (reduceMotion) {
            drawLanes();
        } else {
            animRef.current = requestAnimationFrame(draw);
        }

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', build);
            window.removeEventListener('mousemove', onMouse);
        };
    }, [dark]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    );
}
