<script setup lang="ts">
    import type { Director } from "@prisma/client";
    import { useVModel } from "@vueuse/core";

    type CreateUpdateMovieProps = {
        modelValue: Partial<Director>;
    };

    type CreateUpdateMovieEmits = {
        (e: "save"): void;
        (e: "reset"): void;
    };

    const emit = defineEmits<CreateUpdateMovieEmits>();

    const props = defineProps<CreateUpdateMovieProps>();

    const director = useVModel(props, "modelValue", emit);

    onBeforeUnmount(() => {
        emit("reset");
    });
</script>

<template>
    <create-update
        v-model="director"
        title="Diretor"
        @save="emit('save')"
        @back="$router.push('/backoffice/movies')"
    >
        <template #form>
            <v-container>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="director.firstName"
                            density="compact"
                            label="Nome"
                            required
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="director.lastName"
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
