<script setup lang="ts">
    import { VDataTable, VDataTableServer, VDataTableVirtual } from "vuetify/labs/VDataTable";
    definePageMeta({ layout: "backoffice" });

    const headers: DataTableHeader = [
        { text: "Nome", value: "name" },
        { text: "Descrição", value: "description" },
        { text: "Ano", value: "year" },
        { text: "Duração", value: "duration" },
        { text: "Ações", value: "actions" },
    ];
</script>

<template>
    <v-container
        fluid
        class="tw-h-full"
    >
        <v-card>
            <v-card-title class="tw-bg-red-500">Filmes</v-card-title>
            <v-card-text class="pa-4">
                <v-data-table
                    :items="[]"
                    :headers="headers"
                >
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>
