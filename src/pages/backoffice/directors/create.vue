<script setup lang="ts">
    import type { Director } from "@prisma/client";
    import Swal from "sweetalert2";

    definePageMeta({ layout: "backoffice", name: "CreateDirector" });

    const swal = inject<typeof Swal>("$swal");

    const director = ref<Partial<Director>>({
        firstName: "",
        lastName: "",
    });


    async function saveDirector() {
        try {
            await $fetch(`/api/directors`, {
                method: "POST",
                body: director.value,
            });
            swal?.fire("Success", "Director saved successfully", "success");
        } catch (e) {
            swal?.fire("Error", "Director could not be saved", "error");
        }
    }
</script>

<template>
    <create-update-director
        v-model="director"
        @save="saveDirector"
    />
</template>
