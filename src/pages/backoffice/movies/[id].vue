<script setup lang="ts">
    definePageMeta({ layout: "backoffice", name: "CreateUpdateMovie" });
    const route = useRoute();

    const id = route.params.id;
</script>

<template>
    <v-container>
        <h1>Id: {{ id }}</h1>
    </v-container>
</template>
