<script setup lang="ts">
    import { VBtn } from "vuetify/lib/components/index.mjs";
    import type { MovieDTO } from "~/src/types/dtos/movie";
    import { toHour } from "~/src/utils/time";
    import { moviesHeaders as headers } from "./TableHeaders";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const {query, loadItem} = useQuery<MovieDTO>("title");

    const { data: movies } = useFetch(`/api/movies`, { default: () => ({ count: 0, result: [] }), query });

    function handleCreateMovie() {
        router.push({ name: "CreateMovie" });
    }
</script>

<template>
    <list-item
        v-model:search.lazy="query.search"
        title="Filmes"
        @create="handleCreateMovie"
    >
        <template #table>
            <v-data-table-server
                v-model:items-per-page="query.perPage"
                v-model:page="query.page"
                :items="movies.result"
                :headers="headers"
                :search="query.search"
                :items-length="movies.count"
                :items-per-page-options="[2, 10, 20, 30]"
                @update:options="loadItem"
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
            </v-data-table-server>
        </template>
    </list-item>
</template>
