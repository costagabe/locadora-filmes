export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const director = await prisma.director.findFirst({
        where: { id },
    });

    if (!director)
        throw createError({
            status: 404,
            message: "Diretor não encontrado",
        });

    return {
        ...director,
    };
});
