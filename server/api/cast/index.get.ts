import { CastDTO } from "~/src/types/dtos/cast";
import { QueryParams } from "~/server/types/queryParams";

export default defineEventHandler(async (event) => {
    const queryStr = getQuery<QueryParams<CastDTO>>(event);

    const { query } = await createQuery<CastDTO>({ queryStr, searchKey: "firstName" });

    const [count, resultRaw] = await prisma.$transaction([prisma.actor.count({ where: query.where }), prisma.actor.findMany(query)]);

    const result = resultRaw.map((actor) => ({
        id: actor.id,
        name: `${actor.firstName} ${actor.lastName}`,
        firstName: actor.firstName,
        lastName: actor.lastName,
    }));

    return {
        count,
        result,
    }
});
