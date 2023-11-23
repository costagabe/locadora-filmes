<script setup lang="ts">
    import _ from "lodash";
import { useInitialFetch } from "~/src/composables/useInitialFetch";
    import type { MovieDTO } from "~/src/types/dtos/movie";

    definePageMeta({ layout: "backoffice", name: "UpdateMovie" });

    const route = useRoute();
    const id = computed(() => route.params.id as string);

    const movie = ref<MovieDTO>({});

    const { data } = useFetch(`/api/movies/${id.value}`, { immediate: true, key: id.value });

    useInitialFetch(data, movie)

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
