import type { QueryParams } from "~/server/types/queryParams";
import { createQuery } from "~/server/utils/createQuery";
import { GenreDTO } from "~/src/types/dtos/genre";

export default defineEventHandler(async (event) => {
    const queryStr = getQuery<QueryParams<GenreDTO>>(event);

    const { query } = await createQuery<GenreDTO>({ queryStr, searchKey: "name" });

    const [count, resultRaw] = await prisma.$transaction([prisma.genre.count({ where: query.where }), prisma.genre.findMany(query)]);

    const result = resultRaw.map((genre) => ({
        id: genre.id,
        name: genre.name,
    }));

    return { result, count };
});
