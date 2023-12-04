export type QueryParams<T> = {
    page: number;
    perPage: number;
    sortBy: string & keyof T;
    search: string;
};
