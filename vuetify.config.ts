import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";
export default defineVuetifyConfiguration({
    locale: { locale: "pt-br" },
    theme: {
        defaultTheme: "locadoraTheme",

        themes: {
            locadoraTheme: {
                dark: true,
                colors: {
                    primary: "#e50914",
                    secondary: "#2d2d2d",
                },
            },
        },
    },
});
