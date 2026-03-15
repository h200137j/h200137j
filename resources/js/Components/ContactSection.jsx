import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from '@inertiajs/react';
import { Send, CheckCircle, Mail, MapPin, Phone, Linkedin, Github } from 'lucide-react';

function WhatsAppIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    );
}

function InputField({ label, error, children }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                {label}
            </label>
            {children}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        className="mt-1.5 text-xs text-red-500 dark:text-red-400"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl text-sm bg-gray-50 dark:bg-dark-surface border transition-all duration-200 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-brand-500/30 ${
        hasError
            ? 'border-red-400 dark:border-red-500 focus:border-red-400'
            : 'border-gray-200 dark:border-dark-border focus:border-brand-500 dark:focus:border-brand-400'
    }`;

export default function ContactSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [sent, setSent] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
                setSent(true);
                setTimeout(() => setSent(false), 5000);
            },
        });
    };

    return (
        <section id="contact" className="section-padding bg-gray-50/50 dark:bg-dark-surface/30 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-brand-500/30 pointer-events-none" />

            <div className="max-w-7xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="flex items-center gap-3 mb-4"
                >
                    <div className="w-8 h-px bg-brand-500" />
                    <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 tracking-widest uppercase">Contact</span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight"
                        >
                            Let's build something{' '}
                            <span className="text-gradient">great together.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10"
                        >
                            Whether you have a project in mind, want to discuss an opportunity, or just want to say hi —
                            my inbox is always open.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="space-y-4"
                        >
                            {[
                                { icon: Mail,    label: 'Email',    value: 'tcmash3@gmail.com' },
                                { icon: Phone,   label: 'Mobile',   value: '+263 785 180 881' },
                                { icon: Phone,   label: 'Mobile',   value: '+263 778 299 196' },
                                { icon: MapPin,  label: 'Location', value: 'Harare, Zimbabwe' },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                                        <Icon size={16} className="text-brand-500 dark:text-brand-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-600">{label}</p>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex gap-3 mt-8"
                        >
                            {[
                                { icon: Github,      href: 'https://github.com/h200137j',                        label: 'GitHub' },
                                { icon: Linkedin,    href: 'https://www.linkedin.com/in/calvin-mashamba/',       label: 'LinkedIn' },
                                { icon: WhatsAppIcon, href: 'https://wa.me/263785180881',                        label: 'WhatsApp' },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:border-brand-500 dark:hover:border-brand-400 hover:text-brand-500 dark:hover:text-brand-400 transition-all duration-200 hover:-translate-y-0.5"
                                    aria-label={label}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="glass-card p-10 flex flex-col items-center justify-center text-center min-h-[360px]"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                                        className="w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-500/15 flex items-center justify-center mb-5"
                                    >
                                        <CheckCircle size={32} className="text-green-500" />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                                    >
                                        Message sent!
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        className="text-gray-500 dark:text-gray-400 text-sm"
                                    >
                                        Thanks for reaching out. I'll get back to you soon.
                                    </motion.p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={submit}
                                    className="glass-card p-6 md:p-8 space-y-5"
                                >
                                    <InputField label="Your Name" error={errors.name}>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Calvin Mashamba"
                                            className={inputClass(!!errors.name)}
                                        />
                                    </InputField>

                                    <InputField label="Email Address" error={errors.email}>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="you@example.com"
                                            className={inputClass(!!errors.email)}
                                        />
                                    </InputField>

                                    <InputField label="Message" error={errors.message}>
                                        <textarea
                                            rows={5}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Tell me about your project..."
                                            className={`${inputClass(!!errors.message)} resize-none`}
                                        />
                                    </InputField>

                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send size={14} />
                                            </>
                                        )}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
