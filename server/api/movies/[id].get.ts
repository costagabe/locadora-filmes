import moment from "moment";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    const movie = await prisma.movie.findFirst({
        where: { id },
        include: { genres: {}, cast: {}, director: {} },
    });

    if (!movie)
        throw createError({
            status: 404,
            message: "Filme não encontrado",
        });

    return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        releaseDate: moment(movie.releaseDate).format("DD/MM/YYYY"),
        duration: movie.duration,
        posterImage: movie.posterImage,
        directorId: movie.directorId,
        cast: movie.cast.map((cast) => cast.id),
        genres: movie.genres.map((genre) => genre.id),
    };
});
