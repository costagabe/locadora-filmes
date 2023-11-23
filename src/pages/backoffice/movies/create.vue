<script setup lang="ts">
    import type { MovieDTO } from "~/src/types/dtos/movie";

    definePageMeta({ layout: "backoffice", name: "CreateMovie" });

    const movie = ref<MovieDTO>({});

    async function saveMovie() {
        useBasicSave("/api/movies", movie.value, "POST");
    }
</script>

<template>
    <create-update-movie
        v-model="movie"
        @save="saveMovie"
    />
</template>
