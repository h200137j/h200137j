import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Instrument Sans"', ...defaultTheme.fontFamily.sans],
                display: ['"Bricolage Grotesque"', '"Instrument Sans"', ...defaultTheme.fontFamily.sans],
                mono: ['"Spline Sans Mono"', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                // Jacaranda dusk — the dark world
                night: {
                    DEFAULT: '#150F27',
                    surface: '#1D1535',
                    card:    '#251B42',
                    line:    '#392B61',
                },
                // Warm paper — the light world
                paper: {
                    DEFAULT: '#F6F1E7',
                    card:    '#FDFAF2',
                    line:    '#E0D6C2',
                },
                // Jacaranda bloom — structure, links, cool accent
                lilac: {
                    200: '#DCCDFF',
                    300: '#C8B0FF',
                    400: '#B294FA',
                    500: '#9770EE',
                    600: '#7A4FD6',
                    700: '#6640BE',
                    800: '#4A2E8C',
                },
                // Sunshine City — actions, awards, warm accent
                sun: {
                    300: '#FFC96B',
                    400: '#FFB03C',
                    500: '#F0980F',
                    600: '#C4770B',
                    700: '#9C5E09',
                },
                ink: '#241A44',
                // Compat aliases for admin pages (Login, Dashboard)
                brand: {
                    50:  '#F4EFFF',
                    100: '#E9DFFF',
                    400: '#B294FA',
                    500: '#9770EE',
                    600: '#7A4FD6',
                    900: '#3A2470',
                },
                dark: {
                    bg:      '#150F27',
                    surface: '#1D1535',
                    card:    '#251B42',
                    border:  '#392B61',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%':      { transform: 'translateY(-12px)' },
                },
            },
        },
    },
    plugins: [forms],
};
