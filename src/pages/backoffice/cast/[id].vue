<script setup lang="ts">
    import type { CastDTO } from "~/src/types/dtos/cast";

    definePageMeta({ layout: "backoffice", name: "UpdateCast" });

    const route = useRoute();

    const actor = ref<CastDTO>({ firstName: "" });
    const { data } = useFetch(`/api/genres/${route.params.id}`);

    useInitialFetch(data, actor);

    const { save } = useBasicSave("/api/genres", actor, "PUT");
</script>

<template>
    <create-update-actor
        v-if="actor"
        v-model="actor"
        @save="save"
    />
</template>
