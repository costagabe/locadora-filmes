import moment from "moment";

export default defineEventHandler(async (event) => {
    return (
        await prisma.movie.findMany({
            include: {
                genres: {},
                cast: {},
            },
        })
    ).map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        releaseDate: moment(movie.releaseDate).format("DD/MM/YYYY"),
        duration: movie.duration,
        posterImage: movie.posterImage,
        directorId: movie.directorId,
        cast: movie.cast.map((cast) => cast.id),
        genres: movie.genres.map((genre) => genre.id),
    }));
});
