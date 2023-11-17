<script setup lang="ts">
    import Swal from "sweetalert2";

    definePageMeta({ layout: "backoffice", name: "UpdateDirector" });

    const swal = inject<typeof Swal>("$swal");
    const route = useRoute();
    const { data: director } = useFetch(`/api/directors/${route.params.id}`);

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
        v-if="director"
        v-model="director"
        @save="saveDirector"
    />
</template>
