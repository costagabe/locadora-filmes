<script setup lang="ts">
    import { useVModel } from "@vueuse/core";
    import type { CastDTO } from "../types/dtos/cast";

    type CreateUpdateMovieProps = {
        modelValue: Partial<CastDTO>;
    };

    type CreateUpdateMovieEmits = {
        (e: "save"): void;
    };

    const emit = defineEmits<CreateUpdateMovieEmits>();

    const props = defineProps<CreateUpdateMovieProps>();

    const actor = useVModel(props, "modelValue", emit);
</script>

<template>
    <create-update
        v-model="actor"
        title="Ator/Atriz"
        @save="emit('save')"
        @back="$router.push('/backoffice/cast')"
    >
        <template #form>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="actor.firstName"
                            density="compact"
                            label="Nome"
                            required
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="actor.lastName"
                            density="compact"
                            label="Sobrenome"
                            required
                        />
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </create-update>
</template>
