<script setup lang="ts">
    import type { GenreDTO } from "~/src/types/dtos/genre";
    import { genresHeaders as headers } from "./TableHeaders";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const { query, loadItem } = useQuery<GenreDTO>("name");

    const { data: genres } = useFetch("/api/genres", {
        default: () => ({ result: [], count: 0 }),
        query: query,
    });

    function handleCreate() {
        router.push({ name: "CreateGenre" });
    }
</script>

<template>
    <list-item
        v-model:search.lazy="query.search"
        title="Gêneros"
        @create="handleCreate"
    >
        <template #table>
            <v-data-table-server
                :items="genres.result"
                :headers="headers"
                v-model:items-per-page="query.perPage"
                v-model:page="query.page"
                :items-length="genres.count"
                :items-per-page-options="[2, 5, 10, 20, 30]"
                @update:options="loadItem"
                density="default"
            >
                <template #no-data>
                    <h1 class="tw-text-xl">Nenhum gênero encontrado.</h1>
                </template>
                <template #item.actions="{ item }">
                    <list-item-actions
                        @update="
                            router.push({
                                name: 'UpdateGenre',
                                params: { id: item.id },
                            })
                        "
                    />
                </template>
            </v-data-table-server>
        </template>
    </list-item>
</template>
