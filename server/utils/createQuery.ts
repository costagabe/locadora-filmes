import { QueryParams } from "../types/queryParams";

type CreateQueryParams<T> = {
    queryStr: QueryParams<T>;
    searchKey: keyof T;
};

export async function createQuery<T extends { id?: string }>({ queryStr, searchKey }: CreateQueryParams<T>) {
    if (Object.keys(queryStr).length === 0) {
        queryStr = { page: "1", perPage: "10", sortBy: "id", sortOrder: "asc", search: "" };
    }

    const query = {
        where: { [searchKey]: { contains: `%${queryStr.search ?? ""}%`, mode: "insensitive" as "insensitive" } },
    };

    return {
        query: {
            where: query.where,
            orderBy: { [queryStr.sortBy]: queryStr.sortOrder },
            skip: (Number(queryStr.page) - 1) * Number(queryStr.perPage),
            take: Number(queryStr.perPage),
        },
    };
}
