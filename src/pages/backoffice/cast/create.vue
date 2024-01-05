<script setup lang="ts">
    import type { CastDTO } from "~/src/types/dtos/cast";

    definePageMeta({ layout: "backoffice", name: "CreateCast" });

    const actor = ref<CastDTO>({ firstName: "" });

    const { save } = useBasicSave("/api/cast", actor, "POST");
</script>

<template>
    <create-update-actor
        v-model="actor"
        @save="save"
    />
</template>
