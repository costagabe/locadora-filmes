<script setup lang="ts">
    import { directorsHeaders as headers } from "./TableHeaders";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const { data: directors } = useFetch("/api/directors");
    console.log(directors.value);
    

    function handleCreateDirector() {
        router.push({ name: "CreateDirector" });
    }
</script>

<template>
    <v-container
        fluid
        class="tw-h-full"
    >
        <v-card>
            <v-card-title class="tw-bg-red-500">
                <v-row justify="space-between">
                    <v-col cols="auto"> Diretores </v-col>
                    <v-col cols="auto">
                        <v-btn
                            variant="outlined"
                            color="accent"
                            @click="handleCreateDirector"
                        >
                            Novo
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text class="pa-4">
                <v-data-table
                    :items="directors ?? []"
                    :headers="headers"
                    items-per-page="10"
                    :items-per-page-options="[10, 20, 30]"
                    density="default"
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
                                            name: 'UpdateDirector',
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
