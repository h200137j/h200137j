import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, Code2, Briefcase } from 'lucide-react';

const skills = [
    { name: 'Laravel PHP', color: 'from-red-500 to-orange-500' },
    { name: 'React',       color: 'from-cyan-400 to-blue-500' },
    { name: 'JavaScript',  color: 'from-yellow-400 to-amber-500' },
    { name: 'Python',      color: 'from-blue-500 to-indigo-600' },
    { name: 'Flutter',     color: 'from-sky-400 to-cyan-500' },
    { name: 'Dart',        color: 'from-teal-400 to-cyan-600' },
    { name: 'Tailwind',    color: 'from-cyan-500 to-teal-500' },
    { name: 'SQL',         color: 'from-orange-400 to-red-500' },
    { name: 'Firebase',    color: 'from-yellow-500 to-orange-600' },
    { name: 'Inertia.js',  color: 'from-purple-500 to-violet-600' },
];

const stats = [
    { icon: Briefcase, label: 'ERP Systems Built', value: '3+' },
    { icon: Code2,     label: 'Languages & Frameworks', value: '10+' },
    { icon: Award,     label: 'Awards Won', value: '2' },
    { icon: GraduationCap, label: 'Degree Class', value: '1st' },
];

function SkillBadge({ skill, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.08, y: -3 }}
            className="group relative"
        >
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`} />
            <div className="relative skill-badge flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color} flex-shrink-0`} />
                {skill.name}
            </div>
        </motion.div>
    );
}

export default function AboutSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="about" className="section-padding bg-gray-50/50 dark:bg-dark-surface/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-brand-500/3 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto" ref={ref}>
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-4"
                >
                    <div className="w-8 h-px bg-brand-500" />
                    <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 tracking-widest uppercase">About Me</span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Bio */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
                        >
                            Crafting software that{' '}
                            <span className="text-gradient">actually matters.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed"
                        >
                            <p>
                                I'm a full-stack software engineer with a Bachelor of Technology in Computer Science
                                (First Class Honours) from the <span className="text-gray-900 dark:text-white font-medium">Harare Institute of Technology</span>.
                            </p>
                            <p>
                                My work spans enterprise ERP systems, mobile applications, and award-winning optimization
                                algorithms. I specialize in building systems that eliminate inefficiency — from multi-currency
                                retail POS modules to intelligent lane navigation algorithms.
                            </p>
                            <p>
                                When I'm not architecting backend systems in Laravel, I'm building cross-platform mobile
                                apps with Flutter or fine-tuning React interfaces that feel genuinely good to use.
                            </p>
                        </motion.div>

                        {/* Education card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="mt-8 glass-card p-5 flex gap-4 items-start"
                        >
                            <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={20} className="text-brand-500 dark:text-brand-400" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">Bachelor of Technology — Computer Science</p>
                                <p className="text-brand-500 dark:text-brand-400 text-sm font-medium">First Class Honours</p>
                                <p className="text-gray-500 dark:text-gray-500 text-xs mt-0.5">Harare Institute of Technology</p>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="mt-6 grid grid-cols-2 gap-4"
                        >
                            {stats.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="glass-card p-4 flex items-center gap-3">
                                    <Icon size={18} className="text-brand-500 dark:text-brand-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-xl font-black text-gray-900 dark:text-white leading-none">{value}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Skills */}
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Technologies I work with
                        </motion.h3>

                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, i) => (
                                <SkillBadge key={skill.name} skill={skill} index={i} />
                            ))}
                        </div>

                        {/* Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-10"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Experience</h3>
                            <div className="space-y-5 relative">
                                <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-brand-500 via-brand-500/30 to-transparent" />

                                {[
                                    {
                                        role: 'Full-Stack Developer',
                                        company: 'Hwange Property Company',
                                        period: '2023 – Present',
                                        desc: 'Built ProCom ERP — Retail POS, Supply Chain, multi-currency finance.',
                                    },
                                    {
                                        role: 'ERP Developer',
                                        company: 'Minera / Ndarama ERP',
                                        period: '2022 – 2023',
                                        desc: 'Custom Laravel ERP eliminating 80% of paperwork across Finance, HR & Procurement.',
                                    },
                                    {
                                        role: 'Capstone Researcher',
                                        company: 'Harare Institute of Technology',
                                        period: '2021 – 2022',
                                        desc: 'LUMINA algorithm — won HIT Book Prize & LADS Africa Prize.',
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="pl-8 relative">
                                        <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-brand-500 border-2 border-white dark:border-dark-surface" />
                                        <p className="font-bold text-gray-900 dark:text-white text-sm">{item.role}</p>
                                        <p className="text-brand-500 dark:text-brand-400 text-xs font-medium">{item.company} · {item.period}</p>
                                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
