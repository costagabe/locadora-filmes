import { PrismaClient } from "@prisma/client";
import { QueryParams } from "../types/queryParams";

type CreateQueryParams<T extends EntityName, K = PrismaClient[T]> = {
    queryStr: QueryParams<K>;
    entity: T;
    searchKey: keyof PrismaClient[T]["fields"];
};
export async function createQuery<T extends EntityName, K = PrismaClient[T]>({ queryStr, entity, searchKey }: CreateQueryParams<T, K>) {
    const query = {
        where: { [searchKey]: { contains: `%${queryStr.search}%`, mode: "insensitive" as "insensitive" } },
    };

    const [count, resultRaw] = await prisma.$transaction([
        prisma[entity].count(query),
        prisma[entity].findMany({
            ...query,
            orderBy: { [queryStr.sortBy]: "asc" },
            skip: (Number(queryStr.page) - 1) * Number(queryStr.perPage),
            take: Number(queryStr.perPage),
        }),
    ]);

    return [count, resultRaw];
}
