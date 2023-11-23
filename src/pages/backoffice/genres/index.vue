<script setup lang="ts">
    import { genresHeaders as headers } from "./TableHeaders";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const { data: genres } = useFetch("/api/genres", { default: () => [] });

    function handleCreate() {
        router.push({ name: "CreateGenre" });
    }
</script>

<template>
    <list-item
        title="Gêneros"
        @create="handleCreate"
    >
        <template #table>
            <v-data-table
                :items="genres"
                :headers="headers"
                items-per-page="10"
                :items-per-page-options="[10, 20, 30]"
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
            </v-data-table>
        </template>
    </list-item>
</template>
