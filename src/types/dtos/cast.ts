import type { MovieDTO } from "./movie";

export type CastDTO = {
    id?: string;
    firstName?: string;
    lastName?: string;
    movies?: string[] | MovieDTO[];
};
