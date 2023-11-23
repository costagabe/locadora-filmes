<script setup lang="ts">
    import type { GenreDTO } from "~/src/types/dtos/genre";

    definePageMeta({ layout: "backoffice", name: "UpdateGenre" });

    const route = useRoute();

    const genre = ref<GenreDTO>({ name: "" });
    const { data } = useFetch(`/api/genres/${route.params.id}`);

    useInitialFetch(data, genre);

    const { save } = useBasicSave("/api/genres", genre, "PUT");
  
</script>

<template>
    <create-update-genre
        v-if="genre"
        v-model="genre"
        @save="save"
    />
</template>
