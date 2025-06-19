/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'media', // 👈 habilita el modo oscuro manual
    content: [
        "./index.html",
        "./src/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0BAB27',
                secondary: '#0D9488',
                background: '#F9FAFB',
                text: '#001121',
                border: '#E5E7EB',
            },
        },
    },
    plugins: [],
};
