<script setup lang="ts">
    import type { CastDTO } from "~/src/types/dtos/cast";
    import { genresHeaders as headers } from "./TableHeaders";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const { query, loadItem } = useQuery<CastDTO>("firstName");

    const { data: cast } = useFetch("/api/cast", {
        default: () => ({ result: [], count: 0 }),
        query: query,
    });

    function handleCreate() {
        router.push({ name: "CreateCast" });
    }
</script>

<template>
    <list-item
        v-model:search.lazy="query.search"
        title="Elenco"
        @create="handleCreate"
    >
        <template #table>
            <v-data-table-server
                :items="cast.result"
                :headers="headers"
                v-model:items-per-page="query.perPage"
                v-model:page="query.page"
                :items-length="cast.count"
                :items-per-page-options="[2, 5, 10, 20, 30]"
                @update:options="loadItem"
                density="default"
            >
                <template #no-data>
                    <h1 class="tw-text-xl">Nenhum ator/atriz encontrado.</h1>
                </template>
                <template #item.actions="{ item }">
                    <list-item-actions
                        @update="
                            router.push({
                                name: 'UpdateCast',
                                params: { id: item.id },
                            })
                        "
                    />
                </template>
            </v-data-table-server>
        </template>
    </list-item>
</template>
