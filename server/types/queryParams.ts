export type QueryParams<T> = {
    page: string;
    perPage: string;
    sortBy: string & keyof T;
    sortOrder: "asc" | "desc";
    search: string;
};
