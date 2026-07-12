import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import CustomCursor from '@/Components/CustomCursor';
import Navbar from '@/Components/Navbar';
import HeroSection from '@/Components/HeroSection';
import AboutSection from '@/Components/AboutSection';
import ProjectsSection from '@/Components/ProjectsSection';
import ContactSection from '@/Components/ContactSection';
import Footer from '@/Components/Footer';

export default function Portfolio() {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved ? saved === 'dark' : true;
        }
        return true;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    // Deep-link support: /#projects lands on the section directly
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
    }, []);

    const toggleDark = () => setDark((d) => !d);

    return (
        <>
            <Head title="Calvin Tafadzwa Mashamba — Full-Stack Engineer" />

            <CustomCursor />
            <Navbar dark={dark} toggleDark={toggleDark} />

            <main>
                <HeroSection dark={dark} />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>

            <Footer />
        </>
    );
}
