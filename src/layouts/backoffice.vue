<script setup lang="ts">
    const items = [
        {
            title: "Dashboard",
            value: "dashboard",
            props: {
                link: true,
                nav: true,
            },
        },
        {
            title: "Alugueis",
            value: "rents",
            props: {
                nav: true,
            },
        },
        {
            title: "Filmes",
            value: "movies",
            props: {
                icon: "mdi-help-box",
                link: true,
                nav: true,
            },
        },
        {
            title: "Diretores",
            value: "directors",
            props: {
                link: true,
                nav: true,
            },
        },
        {
            title: "Elenco",
            value: "cast",
            props: {
                link: true,
                nav: true,
            },
        },
        {
            title: "Gêneros",
            value: "genres",
            props: {
                link: true,
                nav: true,
            },
        },
    ];

    const router = useRouter();
    const { fullName } = storeToRefs(usePersonStore());

    function changeRoute({ id }: { id: string } & any) {
        router.push(`/backoffice/${id}`);
    }
</script>

<template>
    <v-container
        fluid
        class="pa-0 pt-4 tw-h-full"
    >
        <v-row>
            <nuxt-loading-indicator />
        </v-row>
        <v-layout class="tw-h-full">
            <v-app-bar
                color="primary"
                prominent
            >
                <v-toolbar-title>Netoflix</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn
                    variant="text"
                    icon="mdi-magnify"
                ></v-btn>

                <v-btn
                    variant="text"
                    icon="mdi-filter"
                ></v-btn>

                <v-btn
                    variant="text"
                    icon="mdi-dots-vertical"
                ></v-btn>
            </v-app-bar>

            <v-navigation-drawer permanent>
                <v-list-item
                    :subtitle="fullName"
                    class="my-4 ml-4"
                    title="Seja bem-vindo(a)"
                />
                <v-divider class="my-4" />
                <v-list
                    @click:select="changeRoute"
                    :items="items"
                ></v-list>
            </v-navigation-drawer>

            <v-main class="tw-h-full">
                <slot />
            </v-main>
        </v-layout>
    </v-container>
</template>
