export type QueryParams<T> = {
    page: number;
    perPage: number;
    sortBy: string & keyof T;
    sortOrder: "asc" | "desc";
    search: string;
};
