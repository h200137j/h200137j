import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200/50 dark:border-dark-border/50 bg-white dark:bg-dark-bg">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-400 dark:text-gray-600">
                    © {new Date().getFullYear()} Calvin Tafadzwa Mashamba. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
