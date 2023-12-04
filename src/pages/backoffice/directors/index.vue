<script setup lang="ts">
    import type { QueryParams } from "~/src/types/queryParams";
    import { directorsHeaders as headers } from "./TableHeaders";
    import type { DirectorDTO } from "~/src/types/dtos/director";
    import { useQuery } from "~/src/composables/useQuery";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const query = useQuery<DirectorDTO>("firstName");

    const { data: directors } = useFetch("/api/directors", { query });

    function handleCreateDirector() {
        router.push({ name: "CreateDirector" });
    }
</script>

<template>
    <list-item
        title="Diretor"
        @create="handleCreateDirector"
        v-model:search="query.search"
    >
        <template #table>
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
        </template>
    </list-item>
</template>
