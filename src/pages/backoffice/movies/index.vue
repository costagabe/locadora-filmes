<script setup lang="ts">
    import { VDataTable } from "vuetify/labs/VDataTable";
    import { VBtn } from "vuetify/lib/components/index.mjs";
    import { moviesHeaders as headers } from "./TableHeaders";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const { data: items, pending } = await useFetch("/api/movies");
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
                            @click="$router.push('/backoffice/movies/create')"
                        >
                            Novo
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text class="pa-4">
                <v-data-table
                    :items="items ?? []"
                    :headers="headers"
                    items-per-page="10"
                    :items-per-page-options="[10, 20, 30]"
                    :loading="pending"
                >
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
                                            name: 'CreateUpdateMovie',
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
