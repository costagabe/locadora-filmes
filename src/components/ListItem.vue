<script setup lang="ts">
    import { useVModel } from "@vueuse/core";

    type ListItemProps = {
        title: string;
        search: string;
    };

    type ListItemEmits = {
        (event: "create"): void;
        (event: "update:search", value: string): void;
    };

    const props = defineProps<ListItemProps>();
    const emit = defineEmits<ListItemEmits>();

    const searchModel = useVModel(props, "search", emit);
</script>

<template>
    <v-container
        fluid
        class="tw-h-full"
    >
        <v-card>
            <v-card-title class="tw-bg-secondary">
                <v-row justify="space-between">
                    <v-col cols="6">
                        <v-row align="center">
                            <v-col cols="auto">{{ title }}</v-col>
                            <v-col>
                                <v-text-field
                                    v-model.lazy="searchModel"
                                    append-icon="mdi-magnify"
                                    variant="outlined"
                                    density="compact"
                                    single-line
                                    hide-details
                                />
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            variant="outlined"
                            color="accent"
                            @click="emit('create')"
                        >
                            Novo
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text class="pa-4">
                <slot name="table" />
            </v-card-text>
        </v-card>
    </v-container>
</template>
