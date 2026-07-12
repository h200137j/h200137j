import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import LaneFlowCanvas from './LaneFlowCanvas';

const ease = [0.22, 1, 0.36, 1];

function NameLine({ children, delay, className = '' }) {
    return (
        <div className="overflow-hidden">
            <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay, ease }}
                className={`font-display font-extrabold tracking-tight leading-[0.95] text-[clamp(3rem,9vw,7rem)] ${className}`}
            >
                {children}
            </motion.h1>
        </div>
    );
}

const specs = [
    { key: 'ROLE',  value: 'Full-stack software engineer' },
    { key: 'BASE',  value: 'Harare — the Sunshine City' },
    { key: 'WORK',  value: 'ERP systems · mobile · algorithms' },
    { key: 'HONS',  value: 'BTech CS, First Class — HIT' },
];

export default function HeroSection({ dark }) {
    const scrollToSection = (selector) => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden bg-paper dark:bg-night"
        >
            <LaneFlowCanvas dark={dark} />

            {/* Scrim: keep traffic legible but off the type */}
            <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-paper via-paper/60 to-transparent dark:from-night dark:via-night/60 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-16">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-14 lg:gap-8 items-center">

                    {/* Left: identity record */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="font-mono text-xs tracking-[0.25em] uppercase text-sun-600 dark:text-sun-400 mb-8 flex items-center gap-3"
                        >
                            <span className="w-2 h-2 rounded-full bg-sun-500 dark:bg-sun-400 animate-pulse" />
                            Systems online — available for work
                        </motion.p>

                        <NameLine delay={0.25} className="text-ink dark:text-paper">Calvin</NameLine>
                        <NameLine delay={0.37} className="text-outline">Tafadzwa</NameLine>
                        <NameLine delay={0.49} className="text-ink dark:text-paper">Mashamba</NameLine>

                        {/* Spec block — a system record, not a tagline */}
                        <motion.dl
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.85, ease }}
                            className="mt-10 font-mono text-sm space-y-2 border-l-2 border-lilac-600/40 dark:border-lilac-400/40 pl-5"
                        >
                            {specs.map(({ key, value }) => (
                                <div key={key} className="flex gap-4">
                                    <dt className="w-14 shrink-0 text-lilac-700 dark:text-lilac-400 tracking-widest text-xs pt-0.5">{key}</dt>
                                    <dd className="text-ink/80 dark:text-paper/80">{value}</dd>
                                </div>
                            ))}
                        </motion.dl>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.05, ease }}
                            className="mt-10 flex flex-wrap gap-4"
                        >
                            <button
                                onClick={() => scrollToSection('#projects')}
                                className="px-7 py-3.5 rounded bg-sun-500 hover:bg-sun-400 text-ink font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-sun-500/20"
                            >
                                See the projects
                            </button>
                            <button
                                onClick={() => scrollToSection('#contact')}
                                className="px-7 py-3.5 rounded border border-lilac-600/50 dark:border-lilac-400/50 text-lilac-700 dark:text-lilac-300 font-semibold text-sm tracking-wide hover:bg-lilac-500/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Get in touch
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: portrait under a jacaranda arch */}
                    <div className="flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease }}
                            className="relative"
                        >
                            <div className="relative w-72 md:w-80 lg:w-[22rem]">
                                {/* Arch frame */}
                                <div className="relative overflow-hidden rounded-t-[999px] rounded-b-lg border border-lilac-600/30 dark:border-lilac-400/30">
                                    <img
                                        src="/IMG_9292.JPG"
                                        alt="Calvin Tafadzwa Mashamba"
                                        className="w-full aspect-[3/4] object-cover object-top"
                                    />
                                    {/* Dusk wash */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-lilac-800/40 via-transparent to-sun-400/10 mix-blend-multiply" />
                                </div>

                                {/* Chevron baseline + caption */}
                                <div className="chevron-strip mt-4" />
                                <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink/50 dark:text-paper/50 text-center">
                                    Mashamba, C.T. — HIT Book Prize · LADS Africa Prize
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-mono text-[10px] text-ink/40 dark:text-paper/40 tracking-[0.3em] uppercase">Scroll</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowDown size={14} className="text-ink/40 dark:text-paper/40" />
                </motion.div>
            </motion.div>
        </section>
    );
}
