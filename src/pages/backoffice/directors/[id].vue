<script setup lang="ts">
    import type { DirectorDTO } from "~/src/types/dtos/director";

    definePageMeta({ layout: "backoffice", name: "UpdateDirector" });

    const route = useRoute();

    const director = ref<DirectorDTO>({});
    const { data } = useFetch(`/api/directors/${route.params.id}`);

    useInitialFetch(data, director);

    const { save } = useBasicSave("/api/directors", director, "PUT");
    async function saveDirector() {
        save();
    }
</script>

<template>
    <create-update-director
        v-if="director"
        v-model="director"
        @save="saveDirector"
    />
</template>
