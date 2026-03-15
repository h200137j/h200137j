import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

const links = [
    { label: 'Home',     href: '#hero' },
    { label: 'About',    href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact',  href: '#contact' },
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
                    ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/30 border-b border-gray-200/50 dark:border-dark-border/50'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => scrollTo('#hero')}
                    className="text-xl font-bold tracking-tight"
                >
                    <span className="text-gradient">CTM</span>
                    <span className="text-gray-400 dark:text-gray-600">.</span>
                </button>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <button
                            key={l.href}
                            onClick={() => scrollTo(l.href)}
                            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200 relative group"
                        >
                            {l.label}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-500 group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDark}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-dark-border hover:border-brand-500 dark:hover:border-brand-400 transition-all duration-200"
                        aria-label="Toggle dark mode"
                    >
                        <AnimatePresence mode="wait">
                            {dark ? (
                                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun size={15} className="text-brand-400" />
                                </motion.span>
                            ) : (
                                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon size={15} className="text-gray-600" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile */}
                <div className="flex md:hidden items-center gap-3">
                    <button onClick={toggleDark} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-dark-border">
                        {dark ? <Sun size={15} className="text-brand-400" /> : <Moon size={15} className="text-gray-600" />}
                    </button>
                    <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-dark-border">
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
                        className="md:hidden bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-dark-border/50"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {links.map((l) => (
                                <button
                                    key={l.href}
                                    onClick={() => scrollTo(l.href)}
                                    className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors py-1"
                                >
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
