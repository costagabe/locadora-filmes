import type { QueryParams } from "~/server/types/queryParams";
import { GenreDTO } from "~/src/types/dtos/genre";

export default defineEventHandler(async (event) => {
    const queryStr = getQuery<QueryParams<GenreDTO>>(event);

    const query = {
        where: { name: { contains: `%${queryStr.search}%`, mode: "insensitive" as "insensitive" } },
    };

    const [count, resultRaw] = await prisma.$transaction([
        prisma.genre.count(query),
        prisma.genre.findMany({
            ...query,
            orderBy: { [queryStr.sortBy]: "asc" },
            skip: (Number(queryStr.page) - 1) * Number(queryStr.perPage),
            take: Number(queryStr.perPage),
        }),
    ]);
    
    const result = resultRaw
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((genre) => ({
            id: genre.id,
            name: genre.name,
        }));

    return {
        result,
        count,
    };
});
