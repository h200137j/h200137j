import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

const links = [
    { label: 'Profile',  href: '#about',    code: '01' },
    { label: 'Projects', href: '#projects', code: '02' },
    { label: 'Contact',  href: '#contact',  code: '03' },
];

export default function Navbar({ dark, toggleDark }) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (href) => {
        setOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-paper/85 dark:bg-night/85 backdrop-blur-xl border-b border-paper-line dark:border-night-line'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                {/* Wordmark */}
                <button
                    onClick={() => scrollTo('#hero')}
                    className="flex items-center gap-2.5 group"
                >
                    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" className="text-sun-500 dark:text-sun-400">
                        <path d="M1 11 L6 3 L11 11 M7 11 L12 3 L17 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-mono text-sm tracking-[0.2em] text-ink dark:text-paper group-hover:text-lilac-700 dark:group-hover:text-lilac-300 transition-colors">
                        CTM
                    </span>
                </button>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-9">
                    {links.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => scrollTo(l.href)}
                            className="font-mono text-xs tracking-[0.15em] uppercase text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper transition-colors duration-200 relative group"
                        >
                            <span className="text-sun-600 dark:text-sun-400 mr-1.5">{l.code}</span>
                            {l.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-sun-500 group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}

                    <button
                        onClick={toggleDark}
                        className="w-9 h-9 rounded flex items-center justify-center border border-paper-line dark:border-night-line hover:border-sun-500 dark:hover:border-sun-400 transition-all duration-200"
                        aria-label="Toggle dark mode"
                    >
                        <AnimatePresence mode="wait">
                            {dark ? (
                                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun size={15} className="text-sun-400" />
                                </motion.span>
                            ) : (
                                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon size={15} className="text-lilac-700" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile */}
                <div className="flex md:hidden items-center gap-3">
                    <button onClick={toggleDark} aria-label="Toggle dark mode" className="w-9 h-9 rounded flex items-center justify-center border border-paper-line dark:border-night-line">
                        {dark ? <Sun size={15} className="text-sun-400" /> : <Moon size={15} className="text-lilac-700" />}
                    </button>
                    <button onClick={() => setOpen(!open)} aria-label="Menu" className="w-9 h-9 rounded flex items-center justify-center border border-paper-line dark:border-night-line">
                        {open ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-paper/95 dark:bg-night-surface/95 backdrop-blur-xl border-t border-paper-line dark:border-night-line"
                    >
                        <div className="px-6 py-5 flex flex-col gap-5">
                            {links.map((l) => (
                                <button
                                    key={l.href}
                                    onClick={() => scrollTo(l.href)}
                                    className="text-left font-mono text-sm tracking-[0.15em] uppercase text-ink/70 dark:text-paper/70"
                                >
                                    <span className="text-sun-600 dark:text-sun-400 mr-2">{l.code}</span>
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
