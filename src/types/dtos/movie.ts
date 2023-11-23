export type MovieDTO = Partial<{
    id: string;
    title: string;
    description: string;
    releaseDate: string;
    duration: number | null;
    posterImage: string;
    directorId: string;
    cast: Array<string>;
    genres: Array<string>;
}>;
