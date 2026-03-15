import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const words = ['Full-Stack', 'Software', 'Engineer.'];

function AnimatedWord({ word, delay }) {
    return (
        <span className="inline-block overflow-hidden mr-3">
            <motion.span
                className="inline-block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {word}
            </motion.span>
        </span>
    );
}

export default function HeroSection({ dark }) {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 100, damping: 30 });

    const handleMouse = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const scrollToProjects = () => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            ref={containerRef}
            onMouseMove={handleMouse}
            className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-dark-bg"
        >
            <ParticleCanvas dark={dark} />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[calc(100vh-5rem)]">

                    {/* Left: Text */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/10 border border-brand-500/20 w-fit"
                        >
                            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                            <span className="text-xs font-medium text-brand-600 dark:text-brand-400 tracking-wide uppercase">Available for work</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-gray-500 dark:text-gray-400 mb-2 font-light"
                        >
                            Hi, I'm
                        </motion.p>

                        <div className="mb-4">
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: '110%' }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-none"
                                >
                                    Calvin
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: '110%' }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gradient leading-none"
                                >
                                    Tafadzwa
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: '110%' }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-none"
                                >
                                    Mashamba
                                </motion.h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-8">
                            {words.map((w, i) => (
                                <AnimatedWord key={w} word={w} delay={0.7 + i * 0.12} />
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            className="text-gray-500 dark:text-gray-400 max-w-md leading-relaxed mb-10 text-base"
                        >
                            Building high-performance ERP systems, mobile apps, and intelligent algorithms.
                            BT Computer Science (1st Class) — Harare Institute of Technology.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.25 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button
                                onClick={scrollToProjects}
                                className="group relative px-7 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5 overflow-hidden"
                            >
                                <span className="relative z-10">View My Work</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                            <button
                                onClick={scrollToContact}
                                className="px-7 py-3.5 rounded-xl border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-brand-500 dark:hover:border-brand-400 hover:text-brand-500 dark:hover:text-brand-400 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Get In Touch
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: Photo */}
                    <div className="flex justify-center lg:justify-end">
                        <motion.div
                            style={{ rotateX, rotateY, transformPerspective: 1000 }}
                            initial={{ opacity: 0, scale: 0.85, x: 40 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Glow aura */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-500/30 via-cyan-400/20 to-transparent blur-2xl scale-110 dark:from-brand-500/40 dark:via-cyan-400/25" />

                            {/* Decorative ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute -inset-3 rounded-[3rem] border border-dashed border-brand-500/20 dark:border-brand-400/20"
                            />

                            {/* Photo frame */}
                            <div className="relative w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] rounded-[2.5rem] overflow-hidden border-2 border-white/20 dark:border-dark-border shadow-2xl shadow-brand-500/20 dark:shadow-brand-500/30">
                                <img
                                    src="/IMG_9292.JPG"
                                    alt="Calvin Tafadzwa Mashamba"
                                    className="w-full h-full object-cover object-top"
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 via-transparent to-transparent" />
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -bottom-4 -left-6 glass-card px-4 py-2.5 shadow-xl"
                            >
                                <p className="text-xs text-gray-500 dark:text-gray-400">Degree</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">1st Class Honours</p>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                className="absolute -top-4 -right-6 glass-card px-4 py-2.5 shadow-xl"
                            >
                                <p className="text-xs text-gray-500 dark:text-gray-400">Award</p>
                                <p className="text-sm font-bold text-brand-500 dark:text-brand-400">LADS Africa Prize</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-gray-400 dark:text-gray-600 tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ArrowDown size={14} className="text-gray-400 dark:text-gray-600" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
