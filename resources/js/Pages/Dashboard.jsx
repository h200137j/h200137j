import { useState, useEffect } from 'react';
import { Head, router, useForm, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, LogOut, User, Calendar, AtSign, MessageSquare, Inbox, ExternalLink, Sun, Moon } from 'lucide-react';
import CustomCursor from '@/Components/CustomCursor';

function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)    return `${diff}s ago`;
    if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function MessageCard({ message, index }) {
    const [expanded, setExpanded] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);
        router.delete(route('messages.destroy', message.id), {
            preserveScroll: true,
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: deleting ? 0 : 1, y: 0, scale: deleting ? 0.95 : 1 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-5 group"
        >
            <div className="flex items-start justify-between gap-4">
                {/* Avatar + meta */}
                <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-500/20 text-white font-bold text-sm">
                        {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{message.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <AtSign size={11} className="text-gray-400 flex-shrink-0" />
                            <p className="text-xs text-brand-500 dark:text-brand-400 truncate">{message.email}</p>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Calendar size={11} className="text-gray-400 flex-shrink-0" />
                            <p className="text-xs text-gray-400 dark:text-gray-600">{timeAgo(message.created_at)}</p>
                        </div>
                    </div>
                </div>

                {/* Delete */}
                <button
                    onClick={handleDelete}
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 flex-shrink-0"
                    aria-label="Delete message"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            {/* Message preview / expand */}
            <div className="mt-4 pl-14">
                <AnimatePresence initial={false}>
                    {expanded ? (
                        <motion.p
                            key="full"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap"
                        >
                            {message.message}
                        </motion.p>
                    ) : (
                        <motion.p
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2"
                        >
                            {message.message}
                        </motion.p>
                    )}
                </AnimatePresence>

                {message.message.length > 120 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-2 text-xs font-semibold text-brand-500 dark:text-brand-400 hover:underline"
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>
        </motion.div>
    );
}

export default function Dashboard({ auth, messages }) {
    const { post } = useForm();

    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved ? saved === 'dark' : true;
        }
        return true;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    const logout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <>
            <Head title="Dashboard" />
            <CustomCursor />

            <div className="min-h-screen bg-gray-50/50 dark:bg-dark-bg">
                {/* Top bar */}
                <div className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-dark-border/50">
                    <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center">
                                <Mail size={13} className="text-white" />
                            </div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white">
                                <span className="text-gradient">CTM</span> Dashboard
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setDark(d => !d)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-dark-border hover:border-brand-500 dark:hover:border-brand-400 transition-all duration-200"
                                aria-label="Toggle dark mode"
                            >
                                <AnimatePresence mode="wait">
                                    {dark ? (
                                        <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Sun size={13} className="text-brand-400" />
                                        </motion.span>
                                    ) : (
                                        <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Moon size={13} className="text-gray-600" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                            <Link
                                href={route('home')}
                                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-brand-500/5"
                            >
                                <ExternalLink size={13} />
                                View Portfolio
                            </Link>
                            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <User size={13} />
                                {auth?.user?.name ?? 'Calvin'}
                            </div>
                            <form onSubmit={logout}>
                                <button
                                    type="submit"
                                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                                >
                                    <LogOut size={13} />
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-10">
                    {/* Stats row */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                        {[
                            { icon: Inbox,         label: 'Total Messages', value: messages.length },
                            { icon: MessageSquare, label: 'This Week',       value: messages.filter(m => (Date.now() - new Date(m.created_at)) < 604800000).length },
                            { icon: Mail,          label: 'Today',           value: messages.filter(m => new Date(m.created_at).toDateString() === new Date().toDateString()).length },
                        ].map(({ icon: Icon, label, value }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="glass-card p-5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center">
                                        <Icon size={16} className="text-brand-500 dark:text-brand-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-gray-900 dark:text-white leading-none">{value}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Messages */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white">
                            Inbox
                            {messages.length > 0 && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-500/10 dark:bg-brand-500/15 text-brand-500 dark:text-brand-400">
                                    {messages.length}
                                </span>
                            )}
                        </h2>
                    </div>

                    {messages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass-card p-16 flex flex-col items-center justify-center text-center"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-dark-surface flex items-center justify-center mb-4">
                                <Inbox size={24} className="text-gray-400 dark:text-gray-600" />
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white mb-1">No messages yet</p>
                            <p className="text-sm text-gray-400 dark:text-gray-600">When someone fills out the contact form, it'll show up here.</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {messages.map((msg, i) => (
                                    <MessageCard key={msg.id} message={msg} index={i} />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
