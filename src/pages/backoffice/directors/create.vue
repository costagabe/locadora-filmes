<script setup lang="ts">
    import type { DirectorDTO } from "~/src/types/dtos/director";

    definePageMeta({ layout: "backoffice", name: "CreateDirector" });

    const director = ref<DirectorDTO>({});

    const { save } = useBasicSave("/api/directors", director, "POST");

    async function saveDirector() {
        save();
    }
</script>

<template>
    <create-update-director
        v-model="director"
        @save="saveDirector"
    />
</template>
