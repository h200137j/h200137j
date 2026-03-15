import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn, Lock, Mail } from 'lucide-react';
import ParticleCanvas from '@/Components/ParticleCanvas';
import CustomCursor from '@/Components/CustomCursor';

export default function Login({ status }) {
    const [showPassword, setShowPassword] = useState(false);
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved ? saved === 'dark' : true;
        }
        return true;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    const inputClass = (hasError) =>
        `w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-dark-surface border transition-all duration-200 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-brand-500/30 ${
            hasError
                ? 'border-red-400 dark:border-red-500'
                : 'border-gray-200 dark:border-dark-border focus:border-brand-500 dark:focus:border-brand-400'
        }`;

    return (
        <>
            <Head title="Sign In" />
            <CustomCursor />

            <div className="min-h-screen relative flex items-center justify-center bg-white dark:bg-dark-bg overflow-hidden">
                <ParticleCanvas dark={dark} />

                {/* Gradient orbs */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 w-full max-w-md px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 shadow-lg shadow-brand-500/30 mb-5">
                            <Lock size={22} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                            Welcome back,{' '}
                            <span className="text-gradient">Calvin.</span>
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Sign in to access your dashboard
                        </p>
                    </motion.div>

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-card p-8 shadow-2xl shadow-black/5 dark:shadow-black/30"
                    >
                        <AnimatePresence>
                            {status && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-5 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-sm text-green-700 dark:text-green-400"
                                >
                                    {status}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 pointer-events-none" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="calvin@ctm.dev"
                                        autoComplete="username"
                                        autoFocus
                                        className={inputClass(!!errors.email)}
                                    />
                                </div>
                                <AnimatePresence>
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-1.5 text-xs text-red-500 dark:text-red-400"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 pointer-events-none" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className={`${inputClass(!!errors.password)} pr-11`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {errors.password && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-1.5 text-xs text-red-500 dark:text-red-400"
                                        >
                                            {errors.password}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Remember me */}
                            <label className="flex items-center gap-3 group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 rounded-full bg-gray-200 dark:bg-dark-border peer-checked:bg-brand-500 transition-colors duration-200" />
                                    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-4" />
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 select-none">Keep me signed in</span>
                            </label>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={processing}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                            >
                                {processing ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <LogIn size={15} />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Footer note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6"
                    >
                        Private access only &nbsp;·&nbsp; CTM Portfolio
                    </motion.p>
                </div>
            </div>
        </>
    );
}
