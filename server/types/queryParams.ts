export type QueryParams<T> = {
    page: string;
    perPage: string;
    sortBy: string & keyof T;
    search: string;
};
