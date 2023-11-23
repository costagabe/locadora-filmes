<script setup lang="ts">
    import _ from "lodash";
    import { useInitialFetch } from "~/src/composables/useInitialFetch";
    import type { MovieDTO } from "~/src/types/dtos/movie";

    definePageMeta({ layout: "backoffice", name: "UpdateMovie" });

    const route = useRoute();
    const id = computed(() => route.params.id as string);

    const movie = ref<MovieDTO>({});

    const { data } = useFetch(`/api/movies/${id.value}`, { immediate: true, key: id.value });

    useInitialFetch(data, movie);

    const { save } = useBasicSave("/api/movies", movie, "PUT");

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
