import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Building2, Database, Trophy, Smartphone, ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'ProCom ERP',
        subtitle: 'Hwange Property Company',
        icon: Building2,
        tags: ['Laravel', 'React', 'Inertia.js', 'MySQL', 'Tailwind'],
        color: 'from-blue-500 to-cyan-500',
        accent: 'blue',
        summary: 'Enterprise-grade ERP system powering retail, supply chain, and finance operations.',
        highlights: [
            'High-performance Retail POS module with real-time inventory sync',
            'Multi-currency support (USD, ZWL, ZAR) with live exchange rate integration',
            'Comprehensive Supply Chain management with automated multi-stage procurement workflows',
            'Automated purchase order generation, approval chains, and supplier management',
            'Financial reporting dashboards with drill-down analytics',
            'Role-based access control across all modules',
        ],
        description: `ProCom is a full-featured ERP system built for Hwange Property Company. The system handles everything from point-of-sale transactions to complex procurement workflows. The Retail POS module processes hundreds of transactions daily with sub-second response times, while the Supply Chain module automates the entire procurement lifecycle — from requisition to goods received.`,
    },
    {
        id: 2,
        title: 'Minera / Ndarama ERP',
        subtitle: 'Custom Enterprise Platform',
        icon: Database,
        tags: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Vue.js'],
        color: 'from-violet-500 to-purple-600',
        accent: 'violet',
        summary: 'Custom-architected ERP eliminating 80% of paperwork across Finance, HR & Procurement.',
        highlights: [
            'Eliminated 80% of manual paperwork through intelligent workflow automation',
            'Integrated Finance, Procurement, and HR into a single unified platform',
            'Custom Portal & API access for third-party integrations',
            'Automated payroll processing with tax compliance',
            'Real-time budget tracking and variance analysis',
            'Audit trail and compliance reporting built-in',
        ],
        description: `Minera ERP (also deployed as Ndarama ERP) is a ground-up Laravel architecture designed to replace paper-heavy processes in mid-size enterprises. The system integrates Finance, Procurement, and HR modules with a custom API layer that allows external systems to connect seamlessly. The result was an 80% reduction in manual paperwork and dramatically faster month-end close processes.`,
    },
    {
        id: 3,
        title: 'LUMINA',
        subtitle: 'Award-Winning Capstone Project',
        icon: Trophy,
        tags: ['Python', 'Algorithm Design', 'Optimization', 'Data Analysis'],
        color: 'from-amber-400 to-orange-500',
        accent: 'amber',
        summary: 'Lane Utilization Management & Intelligent Navigation Algorithm — dual prize winner.',
        highlights: [
            '🏆 Won the HIT Book Prize for best Capstone Design Project',
            '🏆 Won the LADS Africa Prize for best Capstone Design Project',
            'Intelligent lane assignment algorithm reducing congestion by optimizing vehicle flow',
            'Real-time adaptive routing based on live traffic density data',
            'Simulation framework for testing algorithm performance under various load conditions',
            'Comprehensive research paper with mathematical proofs of optimality',
        ],
        description: `LUMINA (Lane Utilization Management and Intelligent Navigation Algorithm) is an optimization algorithm developed as a capstone project at the Harare Institute of Technology. The algorithm intelligently assigns vehicles to lanes based on real-time utilization data, significantly reducing congestion and improving throughput. The project won both the HIT Book Prize and the LADS Africa Prize — the two most prestigious awards for capstone projects at HIT.`,
    },
    {
        id: 4,
        title: 'Flutter Mobile Apps',
        subtitle: 'Personal Projects',
        icon: Smartphone,
        tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
        color: 'from-teal-400 to-cyan-500',
        accent: 'teal',
        summary: 'Cross-platform mobile apps built with Flutter — a Bible app and a password generator.',
        highlights: [
            'Sacred Scrolls — full-featured Bible app with offline reading, bookmarks & search',
            'LockSmith — secure password generator with strength analysis and vault storage',
            'Both apps built with Flutter for iOS & Android from a single codebase',
            'Firebase backend for sync, authentication, and cloud storage',
            'Clean, intuitive UI following Material Design 3 principles',
            'Offline-first architecture for reliable performance without internet',
        ],
        description: `Two personal Flutter projects showcasing cross-platform mobile development. Sacred Scrolls is a Bible reading app with offline support, bookmarks, and full-text search across all books and chapters. LockSmith is a password generator and manager with real-time strength analysis, custom rules, and encrypted local vault storage. Both apps demonstrate clean architecture patterns and production-ready Flutter development.`,
    },
];

function ProjectModal({ project, onClose }) {
    const Icon = project.icon;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header gradient */}
                <div className={`h-2 w-full bg-gradient-to-r ${project.color} rounded-t-2xl`} />

                <div className="p-6 md:p-8">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-surface flex items-center justify-center hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                    >
                        <X size={14} />
                    </button>

                    {/* Icon + title */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon size={22} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">{project.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{project.subtitle}</p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-dark-border">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                        {project.description}
                    </p>

                    {/* Highlights */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">Key Features</h4>
                        <ul className="space-y-2.5">
                            {project.highlights.map((h, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                                >
                                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} flex-shrink-0`} />
                                    {h}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function ProjectCard({ project, index, onClick }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const Icon = project.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            onClick={onClick}
            data-cursor
            className="glass-card p-6 group relative overflow-hidden cursor-none"
        >
            {/* Hover gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={20} className="text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{project.subtitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{project.summary}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-dark-surface text-gray-500 dark:text-gray-500 border border-gray-200/50 dark:border-dark-border/50">
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-dark-surface text-gray-500 dark:text-gray-500">
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-500 dark:text-brand-400 group-hover:gap-2.5 transition-all duration-200">
                    View Details
                    <ArrowUpRight size={13} />
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectsSection() {
    const [selected, setSelected] = useState(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="projects" className="section-padding bg-white dark:bg-dark-bg relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-brand-500/3 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="flex items-center gap-3 mb-4"
                >
                    <div className="w-8 h-px bg-brand-500" />
                    <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 tracking-widest uppercase">Projects</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight"
                >
                    Things I've{' '}
                    <span className="text-gradient">built.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-500 dark:text-gray-400 max-w-xl mb-12 text-base"
                >
                    From enterprise ERP systems to award-winning algorithms. Click any card to explore the details.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-5">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelected(p)} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <ProjectModal project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
