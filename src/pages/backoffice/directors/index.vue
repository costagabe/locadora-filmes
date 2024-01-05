<script setup lang="ts">
    import { useQuery } from "~/src/composables/useQuery";
    import type { DirectorDTO } from "~/src/types/dtos/director";
    import { directorsHeaders as headers } from "./TableHeaders";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const {query, loadItem} = useQuery<DirectorDTO>("firstName");

    const { data: directors } = useFetch("/api/directors", { default: () => ({ result: [], count: 0 }), query });

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
            <v-data-table-server
                v-model:items-per-page="query.perPage"
                v-model:page="query.page"
                :items="directors.result"
                :headers="headers"
                :search="query.search"
                :items-length="directors.count"
                :items-per-page-options="[2, 10, 20, 30]"
                @update:options="loadItem"
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
            </v-data-table-server>
        </template>
    </list-item>
</template>
