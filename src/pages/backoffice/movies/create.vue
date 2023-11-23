<script setup lang="ts">
    import type { MovieDTO } from "~/src/types/dtos/movie";

    definePageMeta({ layout: "backoffice", name: "CreateMovie" });

    const movie = ref<MovieDTO>({});
    const { save } = useBasicSave("/api/movies", movie, "POST");

    async function saveMovie() {
        save();
    }
</script>

<template>
    <create-update-movie
        v-model="movie"
        @save="saveMovie"
    />
</template>
