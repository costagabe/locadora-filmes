import _ from "lodash";
import type { MovieDTO } from "~/src/types/dtos/movie";

export const useMoviesStore = defineStore("moviesStore", () => {
    const initialState = {
        id: undefined,
        title: undefined,
        description: undefined,
        releaseDate: undefined,
        duration: undefined,
        posterImage: undefined,
        directorId: "",
        cast: [],
        genres: [],
    };

    const movie = ref<MovieDTO>(_.cloneDeep(initialState));

    const id = ref("");

    const { data: movies, error: moviesError, refresh } = useFetch("/api/movies", {});

    function setId(value: string) {
        id.value = value;
    }

    function setMovie(value: MovieDTO) {
        movie.value = _.cloneDeep(value);
    }

    function reset() {
        movie.value = _.cloneDeep(initialState);
        id.value = "";
    }

    return {
        movies,
        movie,
        id,
        setId,
        setMovie,
        refresh,
        reset,
    };
});
