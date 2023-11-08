import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";
import pt from "vuetify/"
export default defineVuetifyConfiguration({
    localeMessages:"en",
    
    locale: {
        locale: "en",
    },
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
