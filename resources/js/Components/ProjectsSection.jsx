import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Plus } from 'lucide-react';

const projects = [
    {
        code: 'PRJ-01',
        title: 'ProCom ERP',
        subtitle: 'Hwange Property Company',
        tags: ['Laravel', 'React', 'Inertia.js', 'MySQL', 'Tailwind'],
        status: { label: 'In production', tone: 'sun' },
        summary: 'Enterprise ERP powering retail, supply chain, and finance operations.',
        highlights: [
            'High-performance Retail POS module with real-time inventory sync',
            'Multi-currency support (USD, ZWL, ZAR) with live exchange rate integration',
            'Supply chain management with automated multi-stage procurement workflows',
            'Automated purchase order generation, approval chains, and supplier management',
            'Financial reporting dashboards with drill-down analytics',
            'Role-based access control across all modules',
        ],
        description: `ProCom is a full-featured ERP system built for Hwange Property Company. The system handles everything from point-of-sale transactions to complex procurement workflows. The Retail POS module processes hundreds of transactions daily with sub-second response times, while the Supply Chain module automates the entire procurement lifecycle — from requisition to goods received.`,
    },
    {
        code: 'PRJ-02',
        title: 'Minera / Ndarama ERP',
        subtitle: 'Custom Enterprise Platform',
        tags: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Vue.js'],
        status: { label: 'In production', tone: 'sun' },
        summary: 'Custom-architected ERP that eliminated 80% of paperwork across Finance, HR & Procurement.',
        highlights: [
            'Eliminated 80% of manual paperwork through intelligent workflow automation',
            'Integrated Finance, Procurement, and HR into a single unified platform',
            'Custom portal & API access for third-party integrations',
            'Automated payroll processing with tax compliance',
            'Real-time budget tracking and variance analysis',
            'Audit trail and compliance reporting built in',
        ],
        description: `Minera ERP (also deployed as Ndarama ERP) is a ground-up Laravel architecture designed to replace paper-heavy processes in mid-size enterprises. The system integrates Finance, Procurement, and HR modules with a custom API layer that allows external systems to connect seamlessly. The result was an 80% reduction in manual paperwork and dramatically faster month-end close processes.`,
    },
    {
        code: 'PRJ-03',
        title: 'LUMINA',
        subtitle: 'Lane Utilization & Intelligent Navigation',
        tags: ['Python', 'Algorithm Design', 'Optimization', 'Data Analysis'],
        status: { label: '2× award winner', tone: 'sun' },
        summary: 'The lane-flow algorithm animating this page\'s hero — dual capstone prize winner.',
        highlights: [
            'Won the HIT Book Prize for best Capstone Design Project',
            'Won the LADS Africa Prize for best Capstone Design Project',
            'Intelligent lane assignment that reduces congestion by optimizing vehicle flow',
            'Real-time adaptive routing based on live traffic density data',
            'Simulation framework for testing performance under various load conditions',
            'Research paper with mathematical proofs of optimality',
        ],
        description: `LUMINA (Lane Utilization Management and Intelligent Navigation Algorithm) is an optimization algorithm developed as a capstone project at the Harare Institute of Technology. The algorithm intelligently assigns vehicles to lanes based on real-time utilization data, significantly reducing congestion and improving throughput. It won both the HIT Book Prize and the LADS Africa Prize — the two most prestigious awards for capstone projects at HIT. The traffic weaving through this page's hero is a live miniature of it.`,
    },
    {
        code: 'PRJ-04',
        title: 'Tardis',
        subtitle: 'MySQL Database Sync Tool',
        tags: ['Go', 'Wails', 'React', 'SSH', 'MySQL'],
        status: { label: 'Open source', tone: 'lilac' },
        github: 'https://github.com/h200137j/tardis',
        summary: 'Transfer And Retrieve Database In Seconds — one-click MySQL workflows for Ubuntu Linux.',
        highlights: [
            'Pull from production — SSH, dump, compress, and download in one click',
            'Push to test server — full prod → local → test pipeline automated end-to-end',
            'Pull & import local — dumps prod and imports straight into local MySQL',
            'Import from file — supports .sql and .sql.gz files',
            'Live progress panel with elapsed timer, MB transferred, and per-step status',
            'Secure credential storage with 0600 permissions',
            'Supports SSH password and private key authentication',
        ],
        description: `Tardis (Transfer And Retrieve Database In Seconds) is a desktop app for Ubuntu Linux that automates MySQL database workflows in a single click. Built with Wails v2, Go, and React, it handles the full lifecycle of syncing databases between production, test, and local environments — including SSH tunneling, dump compression, SFTP transfer, and import. It also automatically strips MariaDB sandbox mode comments from dumps for clean imports.`,
    },
    {
        code: 'PRJ-05',
        title: 'GoVPN',
        subtitle: 'OpenVPN Desktop Client',
        tags: ['Go', 'Wails', 'Vanilla JS', 'OpenVPN', 'Linux'],
        status: { label: 'Open source', tone: 'lilac' },
        github: 'https://github.com/h200137j/VPN',
        summary: 'Lightweight OpenVPN client for Linux with multiple profiles, live stats, and stale route cleanup.',
        highlights: [
            'Multiple VPN profiles — each with their own imported .ovpn config and credentials',
            'Live connection stats — VPN IP, public IP, cipher, bytes sent/received, connection timer',
            'System tray support — minimize and keep the VPN running in the background',
            'Fixes the classic Linux "connected but no traffic" bug with automatic stale tun cleanup',
            'Graceful disconnect via SIGTERM so OpenVPN cleans up its own routes',
            'Live color-coded OpenVPN log stream in real time',
            'Credentials stored with 0600 permissions, never in plain text outside config dir',
        ],
        description: `GoVPN is a lightweight OpenVPN client for Linux built with Go and Wails v2. It provides a clean UI for managing multiple VPN profiles, each with their own imported .ovpn config and saved credentials. The app solves a common Linux pain point by automatically flushing stale tun interfaces on reconnect — fixing the "connected but no traffic" bug. All system-level operations are handled by the Go backend via sudo, while the frontend renders in a WebKit2GTK webview.`,
    },
    {
        code: 'PRJ-06',
        title: 'Flutter Mobile Apps',
        subtitle: 'Sacred Scrolls · LockSmith',
        tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
        status: { label: 'Shipped', tone: 'lilac' },
        summary: 'Cross-platform mobile apps — a Bible reader and a password generator.',
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

function ProjectRow({ project, index, open, onToggle }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-paper-line dark:border-night-line"
        >
            <button
                onClick={onToggle}
                aria-expanded={open}
                className="w-full py-6 md:py-7 flex items-center gap-4 md:gap-8 text-left group"
            >
                <span className="font-mono text-[11px] tracking-[0.15em] text-lilac-700 dark:text-lilac-400 w-14 shrink-0">
                    {project.code}
                </span>

                <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-xl md:text-3xl text-ink dark:text-paper group-hover:text-sun-600 dark:group-hover:text-sun-400 transition-colors duration-300 truncate">
                        {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-ink/50 dark:text-paper/50 mt-0.5 truncate">{project.subtitle}</p>
                </div>

                <span className={`stamp hidden sm:inline-block ${project.status.tone === 'sun' ? 'stamp-sun' : 'stamp-lilac'}`}>
                    {project.status.label}
                </span>

                <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-9 h-9 rounded border border-paper-line dark:border-night-line flex items-center justify-center shrink-0 group-hover:border-sun-500 dark:group-hover:border-sun-400 transition-colors"
                >
                    <Plus size={15} className="text-ink/60 dark:text-paper/60" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 md:pl-[5.5rem] pr-2">
                            <span className={`stamp sm:hidden inline-block mb-4 ${project.status.tone === 'sun' ? 'stamp-sun' : 'stamp-lilac'}`}>
                                {project.status.label}
                            </span>

                            <p className="text-sm text-ink/70 dark:text-paper/70 leading-relaxed max-w-3xl">
                                {project.description}
                            </p>

                            <div className="mt-6 grid md:grid-cols-2 gap-x-10 gap-y-2.5 max-w-3xl">
                                {project.highlights.map((h) => (
                                    <div key={h} className="flex items-start gap-3 text-sm text-ink/70 dark:text-paper/70">
                                        <svg width="10" height="7" viewBox="0 0 10 7" className="mt-1.5 shrink-0 text-sun-600 dark:text-sun-400">
                                            <path d="M1 6 L5 1 L9 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {h}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="font-mono text-[11px] px-2.5 py-1 rounded border border-paper-line dark:border-night-line text-ink/60 dark:text-paper/60">
                                        {tag}
                                    </span>
                                ))}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 inline-flex items-center gap-1.5 font-mono text-xs text-lilac-700 dark:text-lilac-300 hover:text-sun-600 dark:hover:text-sun-400 transition-colors"
                                    >
                                        <ExternalLink size={13} />
                                        View on GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function ProjectsSection() {
    const [openCode, setOpenCode] = useState(null);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="projects" className="section-padding bg-paper dark:bg-night relative overflow-hidden">
            <div className="max-w-7xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="flex items-center gap-4 mb-6"
                >
                    <span className="record-code">02 · Projects</span>
                    <div className="flex-1 max-w-24 chevron-strip" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-4xl md:text-5xl font-extrabold text-ink dark:text-paper mb-4 leading-[1.05]"
                >
                    The project{' '}
                    <span className="text-sun-600 dark:text-sun-400">register.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-ink/60 dark:text-paper/60 max-w-xl mb-12"
                >
                    Six entries, from enterprise ERP systems to an award-winning algorithm.
                    Open any record for the full details.
                </motion.p>

                <div className="border-t border-paper-line dark:border-night-line">
                    {projects.map((p, i) => (
                        <ProjectRow
                            key={p.code}
                            project={p}
                            index={i}
                            open={openCode === p.code}
                            onToggle={() => setOpenCode(openCode === p.code ? null : p.code)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
