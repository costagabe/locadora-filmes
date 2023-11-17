import { Director, Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const body = await readBody<Director>(event);

    const director: Prisma.DirectorCreateInput = {
        ...body,
    };

    await prisma.director.create({
        data: {
            ...director,
        },
    });

    return { director };
});
