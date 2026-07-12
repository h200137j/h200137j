export default function Footer() {
    return (
        <footer className="bg-paper dark:bg-night">
            <div className="chevron-strip" />
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-mono text-xs text-ink/50 dark:text-paper/50 tracking-wider">
                    © {new Date().getFullYear()} Calvin Tafadzwa Mashamba
                </p>
                <p className="font-mono text-[11px] text-ink/40 dark:text-paper/40 tracking-[0.2em] uppercase">
                    Built in the Sunshine City
                </p>
            </div>
        </footer>
    );
}
