import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const rafRef = useRef(null);
    const rawPos = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const move = (e) => {
            rawPos.current = { x: e.clientX, y: e.clientY };
        };

        const loop = () => {
            setPos({ ...rawPos.current });
            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        window.addEventListener('mousemove', move);

        const onDown = () => setClicked(true);
        const onUp = () => setClicked(false);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        const addHover = () => {
            document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
                el.addEventListener('mouseenter', () => setHovered(true));
                el.addEventListener('mouseleave', () => setHovered(false));
            });
        };

        addHover();
        const observer = new MutationObserver(addHover);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-brand-500 mix-blend-difference"
                animate={{
                    x: pos.x - (hovered ? 20 : 16),
                    y: pos.y - (hovered ? 20 : 16),
                    width:  hovered ? 40 : 32,
                    height: hovered ? 40 : 32,
                    opacity: clicked ? 0.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.5 }}
            />
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-brand-500"
                animate={{
                    x: pos.x - 3,
                    y: pos.y - 3,
                    width:  clicked ? 10 : 6,
                    height: clicked ? 10 : 6,
                }}
                transition={{ type: 'spring', stiffness: 600, damping: 30, mass: 0.2 }}
            />
        </>
    );
}
