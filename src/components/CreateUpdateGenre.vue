<script setup lang="ts">
    import { useVModel } from "@vueuse/core";
    import type { GenreDTO } from "../types/dtos/genre";

    type CreateUpdateMovieProps = {
        modelValue: Partial<GenreDTO>;
    };

    type CreateUpdateMovieEmits = {
        (e: "save"): void;
    };

    const emit = defineEmits<CreateUpdateMovieEmits>();

    const props = defineProps<CreateUpdateMovieProps>();

    const genre = useVModel(props, "modelValue", emit);
</script>

<template>
    <create-update
        v-model="genre"
        title="Gênero"
        @save="emit('save')"
        @back="$router.push('/backoffice/genres')"
    >
        <template #form>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="genre.name"
                            density="compact"
                            label="Nome"
                            required
                        />
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </create-update>
</template>
