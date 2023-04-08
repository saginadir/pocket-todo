/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                'lobster': ['Lobster Two', 'cursive'],
            }
        },
    },
    plugins: [require("@tailwindcss/forms")],
}

