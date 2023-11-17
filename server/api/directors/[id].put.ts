import { Director } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const body = await readBody<Director>(event);

    const id = getRouterParam(event, "id");
    const director = await prisma.director.findFirst({
        where: { id },
    });

    if (!director)
        throw createError({
            status: 404,
            message: "Director não encontrado",
        });

    Object.assign(director, body);

    await prisma.director.update({
        where: { id },
        data: {
            ...director,
        },
    });

    return { movie: director };
});
