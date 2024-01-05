import moment from "moment";
import { MovieDTO } from "~/src/types/dtos/movie";
import { QueryParams } from "~/src/types/queryParams";

export default defineEventHandler(async (event) => {
    const queryStr = getQuery<QueryParams<MovieDTO>>(event);

    const query = {
        where: {
            OR: [
                { title: { contains: `%${queryStr.search}%`, mode: "insensitive" as "insensitive" } },
                { description: { contains: `%${queryStr.search}%`, mode: "insensitive" as "insensitive" } },
            ],
        },
        orderBy: { [queryStr.sortBy]: queryStr.sortOrder },
        skip: (Number(queryStr.page) - 1) * Number(queryStr.perPage),
        take: Number(queryStr.perPage),
        include: {
            cast: true,
            genres: true,
        },
    };

    const [count, resultRaw] = await prisma.$transaction([prisma.movie.count({ where: query.where }), prisma.movie.findMany({ ...query })]);

    const result = resultRaw.map((movie) => ({
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

    return {
        count,
        result,
    };
});
