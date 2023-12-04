import { PrismaClient } from "@prisma/client";
import { QueryParams } from "../types/queryParams";

export function useQuery<I, T extends Entities, K = PrismaClient[T]>(queryStr: QueryParams<I>, searchEntity: T, searchKey: keyof K) {
    const query = {
        where: {
            [searchKey]: { contains: `%${queryStr.search}%`, mode: "insensitive" as "insensitive" },
        },
    };

    async function getQuery() {
        const [count, resultRaw] = await prisma.$transaction([
            prisma[searchEntity].count(query),
            prisma[searchEntity].findMany({
                ...query,
                orderBy: { [queryStr.sortBy]: "asc" },
                skip: (Number(queryStr.page) - 1) * Number(queryStr.perPage),
                take: Number(queryStr.perPage),
            }),
        ]);

        return [count, resultRaw];
    }

    return {
        getQuery,
    };
}
