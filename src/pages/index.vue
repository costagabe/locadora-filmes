<script setup lang="ts">
    import logo from "~/src/assets/images/logo.png";
    import bg from "~/src/assets/images/bg.png";

    const router = useRouter();
    const route = useRoute();
    definePageMeta({ layout: "default" });
</script>

<template>
    <v-container
        fluid
        class="tw-h-full container"
        :style="`background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(${bg});
         background-size: cover;
         background-position: center;`"
    >
        <v-row
            justify="space-between"
            class="tw-mt-2"
        >
            <v-col
                cols="auto"
                class="tw-ml-[100px]"
            >
                <v-img
                    :src="logo"
                    :width="200"
                />
            </v-col>
            <v-col
                cols="auto"
                class="tw-mr-[100px]"
            >
                <v-row>
                    <v-col>
                        <v-btn
                            color="primary"
                            @click="$router.push('/signin')"
                        >
                            Login
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row
            class="tw-h-[80%]"
            align="center"
            justify="center"
        >
            <v-col
                cols="auto"
                class="text-h1 tw-bg-slate-950 tw-bg-opacity-50 tw-rounded-lg tw-px-5 tw-py-2 tw-text-center"
            >
                <v-row>
                    <v-col>
                        Seja bem vindo à
                        <br />
                        <span class="tw-text-primary">Neto</span>flix
                    </v-col>
                </v-row>
                <v-row class="text-body-1">
                    <v-col>
                        Clique
                        <nuxt-link
                            href="/signin"
                            class="tw-text-primary"
                            >aqui</nuxt-link
                        >
                        para fazer login na plataforma
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
