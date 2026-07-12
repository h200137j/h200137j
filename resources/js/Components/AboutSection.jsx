import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const skills = [
    'Laravel PHP', 'React', 'JavaScript', 'Python', 'Flutter',
    'Dart', 'Go', 'Tailwind', 'SQL', 'Firebase', 'Inertia.js',
];

const figures = [
    { value: '80%', label: 'paperwork eliminated by one ERP' },
    { value: '3',   label: 'ERP systems running in production' },
    { value: '2',   label: 'capstone prizes for one algorithm' },
    { value: '1st', label: 'class honours, BTech Computer Science' },
];

const timeline = [
    {
        period: '2023 — NOW',
        role: 'Full-Stack Developer',
        company: 'Hwange Property Company',
        desc: 'Built ProCom ERP — retail POS, supply chain, multi-currency finance.',
    },
    {
        period: '2022 — 2023',
        role: 'ERP Developer',
        company: 'Minera / Ndarama ERP',
        desc: 'Custom Laravel ERP that eliminated 80% of paperwork across Finance, HR & Procurement.',
    },
    {
        period: '2021 — 2022',
        role: 'Capstone Researcher',
        company: 'Harare Institute of Technology',
        desc: 'LUMINA lane-navigation algorithm — won the HIT Book Prize & LADS Africa Prize.',
    },
];

export default function AboutSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="about" className="section-padding bg-paper dark:bg-night-surface/40 relative overflow-hidden">
            <div className="max-w-7xl mx-auto" ref={ref}>
                {/* Record code */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 mb-6"
                >
                    <span className="record-code">01 · Profile</span>
                    <div className="flex-1 max-w-24 chevron-strip" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Bio */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl font-extrabold text-ink dark:text-paper mb-6 leading-[1.05]"
                        >
                            Software that makes{' '}
                            <span className="text-sun-600 dark:text-sun-400">paperwork extinct.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4 text-ink/70 dark:text-paper/70 leading-relaxed"
                        >
                            <p>
                                I'm a full-stack software engineer from Harare with a Bachelor of Technology
                                in Computer Science, First Class Honours, from the{' '}
                                <span className="text-ink dark:text-paper font-medium">Harare Institute of Technology</span>.
                            </p>
                            <p>
                                My work replaces friction with flow: ERP systems that turn week-long paper trails
                                into one-click workflows, POS modules that ring up sales in multiple currencies,
                                and a lane-navigation algorithm that reroutes traffic the way I reroute process.
                            </p>
                            <p>
                                Laravel on the backend, React on the front, Flutter in your pocket,
                                Go on the desktop. Whatever the platform, the goal is the same —
                                systems people stop noticing because they simply work.
                            </p>
                        </motion.div>

                        {/* Education record */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="mt-8 ledger-card p-5 flex gap-4 items-start"
                        >
                            <div className="w-10 h-10 rounded bg-lilac-500/10 dark:bg-lilac-500/15 flex items-center justify-center flex-shrink-0">
                                <GraduationCap size={20} className="text-lilac-700 dark:text-lilac-400" />
                            </div>
                            <div>
                                <p className="font-bold text-ink dark:text-paper text-sm">Bachelor of Technology — Computer Science</p>
                                <p className="text-sun-600 dark:text-sun-400 text-sm font-medium">First Class Honours</p>
                                <p className="text-ink/50 dark:text-paper/50 text-xs mt-0.5 font-mono">Harare Institute of Technology</p>
                            </div>
                        </motion.div>

                        {/* The figures — a ledger, not stat tiles */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="mt-8"
                        >
                            <p className="record-code mb-4">The figures</p>
                            <dl className="divide-y divide-paper-line dark:divide-night-line border-y border-paper-line dark:border-night-line">
                                {figures.map(({ value, label }) => (
                                    <div key={label} className="flex items-baseline gap-5 py-3">
                                        <dt className="font-display font-extrabold text-2xl text-sun-600 dark:text-sun-400 w-16 shrink-0 text-right">{value}</dt>
                                        <dd className="text-sm text-ink/70 dark:text-paper/70">{label}</dd>
                                    </div>
                                ))}
                            </dl>
                        </motion.div>
                    </div>

                    {/* Right: Toolkit + Experience */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <p className="record-code mb-5">Toolkit</p>
                            <div className="flex flex-wrap gap-2.5">
                                {skills.map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                                        className="skill-chip"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Experience ledger */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="mt-12"
                        >
                            <p className="record-code mb-5">Experience</p>
                            <div className="space-y-0 divide-y divide-paper-line dark:divide-night-line border-y border-paper-line dark:border-night-line">
                                {timeline.map((item) => (
                                    <div key={item.period} className="py-5 grid grid-cols-[7.5rem_1fr] gap-4">
                                        <p className="font-mono text-[11px] tracking-wider text-lilac-700 dark:text-lilac-400 pt-1">{item.period}</p>
                                        <div>
                                            <p className="font-bold text-ink dark:text-paper text-sm">{item.role}</p>
                                            <p className="text-sun-600 dark:text-sun-400 text-xs font-medium">{item.company}</p>
                                            <p className="text-ink/60 dark:text-paper/60 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                                        </div>
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
