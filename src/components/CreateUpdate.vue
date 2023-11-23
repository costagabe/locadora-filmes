<script setup lang="ts" generic="T extends {id?: string}">
    import { useVModel } from "@vueuse/core";

    type CreateUpdateProps = {
        title: string;
        modelValue: T;
    };

    type CreateUpdateEmits = {
        (event: "back"): void;
        (event: "save"): void;
        (event: "update:modelValue", value: T): void;
    };

    const props = defineProps<CreateUpdateProps>();

    const emit = defineEmits<CreateUpdateEmits>();

    const model = useVModel(props, "modelValue", emit);
</script>

<template>
    <client-only>
        <v-container class="tw-h-full">
            <v-row justify="center">
                <v-col
                    xl="9"
                    lg="11"
                    md="10"
                >
                    <v-card>
                        <v-card-title class="tw-bg-secondary pa-4">
                            <v-row justify="space-between">
                                <v-col cols="auto">
                                    {{ model.id ? "Editar" : "Novo" }} {{ title }}
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn
                                        variant="outlined"
                                        color="accent"
                                        @click="emit('back')"
                                    >
                                        Voltar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-card-text class="pa-4">
                            <v-form>
                                <v-container>
                                    <slot name="form" />
                                    <v-divider class="mb-4" />
                                    <v-row justify="end">
                                        <v-col cols="auto">
                                            <v-btn
                                                color="primary"
                                                @click="emit('save')"
                                            >
                                                Salvar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </client-only>
</template>
