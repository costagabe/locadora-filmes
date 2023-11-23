<script setup lang="ts">
    import { directorsHeaders as headers } from "./TableHeaders";

    definePageMeta({ layout: "backoffice" });

    const router = useRouter();

    const { data: directors } = useFetch("/api/directors");

    function handleCreateDirector() {
        router.push({ name: "CreateDirector" });
    }
</script>

<template>
    <list-item
        title="Diretor"
        @create="handleCreateDirector"
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
