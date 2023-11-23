import moment from "moment";
import { MovieDTO } from "~/src/types/dtos/movie";

export default defineEventHandler(async (event) => {
    const body = await readBody<MovieDTO>(event);

    const id = getRouterParam(event, "id");
    const movie = await prisma.movie.findFirst({
        where: { id },
        
    });

    if (!movie)
        throw createError({
            status: 404,
            message: "Filme não encontrado",
        });

    Object.assign(movie, body);
    movie.releaseDate = moment(movie.releaseDate, "YYYY-MM-DD").toDate();
    
    await prisma.movie.update({
        where: { id },
        data: {
            ...movie,
            cast:{
                set: [],
                connect: body.cast!.map((cast) => ({ id: cast })),
            },
            genres:{
                connect: body.genres!.map((genre) => ({ id: genre })),
            }
        },
    });

    return {movie}

});
