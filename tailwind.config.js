/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#00b8ad',
                black: '#000',
                white: '#fff',
                blue: '#319CFF',
            },
            fontFamily: {
                nunito: ['nunito', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
