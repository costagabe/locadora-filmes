import { Prisma } from "@prisma/client";
import moment from "moment";
import { MovieDTO } from "~/src/types/dtos/movie";

export default defineEventHandler(async (event) => {
    const body = await readBody<Partial<MovieDTO>>(event);

    const movie: Prisma.MovieCreateInput = {
        id: body.id,
        title: body.title!,
        description: body.description!,
        releaseDate: moment(body.releaseDate, "YYYY-MM-DD").toDate(),
        rating: 0,
        posterImage: body.posterImage!,
        rentalPrice: 0,
        director: {
            connect: { id: body.directorId! },
        },
        duration: body.duration,
        availableStock: 0,
        cast: {
            connect: body.cast!.map((cast) => ({ id: cast })),
        },
        genres: {
            connect: body.genres!.map((genre) => ({ id: genre })),
        },
    };

    await prisma.movie.create({
        data: {
            ...movie,
        },
    });

    return { movie };
});
