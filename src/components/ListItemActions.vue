<script setup lang="ts">
    type ListItemActionsEmits = {
        (event: "update"): void;
        (event: "delete"): void;
    };

    defineEmits<ListItemActionsEmits>();
</script>

<template>
    <v-row justify="center">
        <v-col cols="auto">
            <v-btn
                :size="32"
                @click="$emit('update')"
                color="secondary"
                icon="mdi-pencil"
                variant="elevated"
            />
        </v-col>
        <v-col cols="auto">
            <v-btn
                :size="32"
                @click="$emit('delete')"
                color="primary"
                icon="mdi-trash-can-outline"
                variant="elevated"
            />
        </v-col>
    </v-row>
</template>
