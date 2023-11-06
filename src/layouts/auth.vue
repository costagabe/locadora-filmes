<script setup lang="ts">
    import logo from "~/src/assets/images/logo.png";
    import bg from "~/src/assets/images/bg.png";
</script>

<template>
    <v-container
        fluid
        class="tw-h-full"
        :style="`background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(${bg});
         background-size: cover;
         background-position: center;`"
    >
        <v-row
            justify="center"
            class="mt-4"
        >
            <v-col
                xs="12"
                sm="8"
                md="6"
                lg="4"
            >
                <v-row justify="center">
                    <v-col cols="auto">
                        <nuxt-link href="/">
                            <v-img
                                :src="logo"
                                width="auto"
                            />
                        </nuxt-link>
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
                xs="12"
                sm="8"
                md="6"
                lg="4"
            >
                <slot />
            </v-col>
        </v-row>
    </v-container>
</template>
