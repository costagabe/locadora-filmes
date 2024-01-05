import { QueryParams } from "~/server/types/queryParams";
import { DirectorDTO } from "~/src/types/dtos/director";
export default defineEventHandler(async (event) => {

    const queryStr = getQuery<QueryParams<DirectorDTO>>(event);

    const { query } = await createQuery<DirectorDTO>({ queryStr, searchKey: "firstName" });

    const [count, resultRaw] = await prisma.$transaction([prisma.director.count({ where: query.where }), prisma.director.findMany(query)]);

    const result = resultRaw.map((director) => ({
        id: director.id,
        fullName: `${director.firstName} ${director.lastName}`,
        firstName: director.firstName,
        lastName: director.lastName,
    }));

    return {
        count,
        result,
    }
});
