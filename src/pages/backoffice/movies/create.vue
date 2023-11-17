<script setup lang="ts">
    import Swal from "sweetalert2";
    import { useMoviesStore } from "./moviesStore";

    definePageMeta({ layout: "backoffice", name: "CreateMovie" })
    
    const swal = inject<typeof Swal>("$swal");

    const { movie } = storeToRefs(useMoviesStore());

    const { reset } = useMoviesStore();

    function setReleaseDate(value: string) {
        movie.value.posterImage = value;
    }

    async function saveMovie() {
        try {
            await $fetch(`/api/movies`, {
                method: "POST",
                body: movie.value,
            });
            swal?.fire("Success", "Movie saved successfully", "success");
        } catch (e) {
            swal?.fire("Error", "Movie could not be saved", "error");
        }
    }
</script>

<template>
    <create-update-movie
        v-model="movie"
        @save="saveMovie"
        @set-release-date="setReleaseDate"
        @reset="reset"
    />
</template>
