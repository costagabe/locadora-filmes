export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const cast = await prisma.actor.findFirst({
        where: { id },
    });

    if (!cast)
        throw createError({
            status: 404,
            message: "Atuante não encontrado",
        });

    return {
        ...cast,
    };
});
