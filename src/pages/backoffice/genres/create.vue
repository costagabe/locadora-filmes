<script setup lang="ts">
    import type { GenreDTO } from "~/src/types/dtos/genre";

    definePageMeta({ layout: "backoffice", name: "CreateGenre" });

    const genre = ref<GenreDTO>({ name: "" });

    const { save } = useBasicSave("/api/genres", genre, "POST");
</script>

<template>
    <create-update-genre
        v-model="genre"
        @save="save"
    />
</template>
