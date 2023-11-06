import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: "tw-",
    content: [
        "./src/components/**/*.{js,vue,ts}",
        "./src/layouts/**/*.vue",
        "./src/pages/**/*.vue",
        "./src/plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#e50914",
                secondary: "#2d2d2d",
                warning: colors.yellow,
                success: colors.green,
                info: colors.blue,
                danger: colors.red,
            },
        },
    },
};
