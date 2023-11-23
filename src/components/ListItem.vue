<script setup lang="ts">
    type ListItemProps = {
        title: string;
    };

    type ListItemEmits = {
        (event: "create"): void;
    };

    defineProps<ListItemProps>();
    const emit = defineEmits<ListItemEmits>();
</script>

<template>
    <v-container
        fluid
        class="tw-h-full"
    >
        <v-card>
            <v-card-title class="tw-bg-secondary">
                <v-row justify="space-between">
                    <v-col cols="auto"> {{ title }} </v-col>
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
