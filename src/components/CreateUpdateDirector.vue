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
    <v-container class="tw-h-full">
        <v-row justify="center">
            <v-col
                xl="9"
                lg="11"
                md="10"
            >
                <v-card>
                    <v-card-title class="tw-bg-secondary">
                        <v-row justify="space-between">
                            <v-col cols="auto"> {{ director.id ? "Editar" : "Novo" }} Filme </v-col>
                            <v-col cols="auto">
                                <v-btn
                                    variant="outlined"
                                    color="accent"
                                    @click="$router.push('/backoffice/movies')"
                                >
                                    Voltar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text class="pa-4">
                        <v-form>
                            <v-text-field
                                v-model="director.firstName"
                                density="compact"
                                label="Nome"
                                required
                            />
                            <v-text-field
                                v-model="director.lastName"
                                density="compact"
                                label="Sobrenome"
                                required
                            />

                            <v-btn
                                color="primary"
                                @click="emit('save')"
                                >Salvar</v-btn
                            >
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
