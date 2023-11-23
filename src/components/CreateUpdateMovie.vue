<script setup lang="ts">
    import moment from "moment";
    import type { MovieDTO } from "../types/dtos/movie";
    import { useVModel } from "@vueuse/core";

    type CreateUpdateMovieProps = {
        modelValue: MovieDTO;
    };

    type CreateUpdateMovieEmits = {
        (e: "save"): void;
        (e: "reset"): void;
        (e: "setReleaseDate", value: string): void;
        (e: "update:modelValue", value: MovieDTO): void;
    };

    const emit = defineEmits<CreateUpdateMovieEmits>();

    const props = defineProps<CreateUpdateMovieProps>();

    const movie = useVModel(props, "modelValue", emit);

    const [directors, genres, cast] = [
        useFetch("/api/directors").data.value ?? [],
        useFetch("/api/genres").data.value ?? [],
        useFetch("/api/cast").data.value ?? [],
    ];

    

    const movieDate = computed({
        get: () => moment(movie.value.releaseDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
        set: (value) => {
            movie.value.releaseDate = moment(value, "YYYY-MM-DD").format("YYYY-MM-DD");
        },
    });

    onBeforeUnmount(() => {
        emit("reset");
    });
</script>

<template>
    <suspense>
        <create-update
        v-model="movie"
        title="Filme"
        @save="emit('save')"
        @back="$router.push('/backoffice/movies')"
    >
        <template #form>
            <v-container>
                <v-row
                    class="mb-4"
                    justify="center"
                >
                    <v-col cols="auto">
                        <v-img
                            v-if="movie.posterImage !== null"
                            :src="movie.posterImage"
                            :width="400"
                        />
                    </v-col>
                </v-row>
                <v-text-field
                    :value="movie.posterImage"
                    @blur="movie.posterImage = $event.target.value"
                    density="compact"
                    label="URL da Imagem"
                    required
                />
                <v-text-field
                    v-model="movie.title"
                    density="compact"
                    label="Título"
                    required
                />
                <v-textarea
                    v-model="movie.description"
                    rows="3"
                    label="Descrição"
                    required
                />
                <v-row>
                    <v-col>
                        <v-text-field
                            density="compact"
                            v-model="movieDate"
                            label="Ano de Lançamento"
                            required
                            type="date"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model.number="movie.duration"
                            density="compact"
                            label="Duração"
                            required
                        />
                    </v-col>
                    <v-col>
                        <v-select
                            v-model="movie.genres"
                            :items="genres"
                            item-value="id"
                            item-title="name"
                            density="compact"
                            label="Gênero(s)"
                            multiple
                            required
                        />
                    </v-col>
                </v-row>
                <v-autocomplete
                    v-model="movie.directorId"
                    :items="directors"
                    density="compact"
                    item-value="id"
                    item-title="fullName"
                    label="Diretor"
                    required
                />
                <v-autocomplete
                    v-model="movie.cast"
                    :items="cast"
                    density="compact"
                    item-value="id"
                    item-title="name"
                    label="Elenco"
                    multiple
                    required
                />
            </v-container>
        </template>
    </create-update>
    </suspense>
</template>
