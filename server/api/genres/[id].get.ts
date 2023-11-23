export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const genre = await prisma.genre.findFirst({
        where: { id },
    });

    if (!genre)
        throw createError({
            status: 404,
            message: "Gênero não encontrado",
        });

    return {
        ...genre,
    };
});
