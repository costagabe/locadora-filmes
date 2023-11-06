// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@pinia/nuxt", "vuetify-nuxt-module", "@nuxtjs/supabase"],
    appDir: "./src",
    css: ["@/src/assets/css/tailwind.css"],
    components: {
        dirs: ["./src/components"],
    },
    supabase: {
        redirectOptions: {
            login: "/signin",
            callback: "/confirm",
            exclude: ["/", "/signup"],
        },
    },
    imports: {
        dirs: [
            "./src/composables",
            "./src/stores",
            "./server/connections",
            "./src/utils",
        ],
    },
    dir: {
        pages: "./src/pages",
        assets: "./src/assets",
        layouts: "./src/layouts",
        plugins: "./src/plugins",
    },
    pinia: {
        autoImports: ["defineStore", "storeToRefs", ["defineStore", "definePiniaStore"]],
    },
    sourcemap: {
        client: true,
        server: true,
    },
    vuetify: {
        // moduleOptions: { styles: { configFile: "/src/assets/css/setupVuetify.scss" } },
        vuetifyOptions: "./vuetify.config.ts",
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    experimental: {
        inlineSSRStyles: false,
    },
});
