import { GenreDTO } from "~/src/types/dtos/genre";

export default defineEventHandler(async (event) => {
    const body = await readBody<GenreDTO>(event);

    const id = getRouterParam(event, "id");
    const genre = await prisma.genre.findFirst({
        where: { id },
    });

    if (!genre)
        throw createError({
            status: 404,
            message: "Gênero não encontrado",
        });

    Object.assign(genre, body);

    await prisma.genre.update({
        where: { id },
        data: {
            ...genre,
        },
    });

    return { genre };
});
