<script setup lang="ts">
    import { VDataTable } from "vuetify/components";
    import { VBtn } from "vuetify/lib/components/index.mjs";
    import { moviesHeaders as headers } from "./TableHeaders";
    import { toHour } from "~/src/utils/time";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const movies = useFetch(`/api/movies`).data;

    function handleCreateMovie() {
        router.push({ name: "CreateMovie" });
    }
</script>

<template>
    <v-container
        fluid
        class="tw-h-full"
    >
        <v-card>
            <v-card-title class="tw-bg-secondary">
                <v-row justify="space-between">
                    <v-col cols="auto"> Filmes </v-col>
                    <v-col cols="auto">
                        <v-btn
                            variant="outlined"
                            color="accent"
                            @click="handleCreateMovie"
                        >
                            Novo
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text class="pa-4">
                <v-data-table
                    :items="movies ?? []"
                    :headers="headers"
                    items-per-page="10"
                    :items-per-page-options="[10, 20, 30]"
                    density="default"
                >
                    <template #item.posterImage="{ item }">
                        <v-img
                            v-if="item.posterImage !== null"
                            :src="item.posterImage"
                            :width="75"
                            class="my-2"
                        />
                    </template>
                    <template #item.duration="{ item }">
                        {{ toHour(item.duration ?? 0) }}
                    </template>
                    <template #item.actions="{ item }">
                        <v-row justify="center">
                            <v-col cols="auto">
                                <v-btn
                                    :size="32"
                                    color="secondary"
                                    icon="mdi-pencil"
                                    variant="elevated"
                                    @click="
                                        router.push({
                                            name: 'UpdateMovie',
                                            params: { id: item.id },
                                        })
                                    "
                                />
                            </v-col>
                            <v-col cols="auto">
                                <v-btn
                                    :size="32"
                                    color="primary"
                                    icon="mdi-trash-can-outline"
                                    variant="elevated"
                                />
                            </v-col>
                        </v-row>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>
