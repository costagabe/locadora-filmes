import { Prisma } from "@prisma/client";
import { GenreDTO } from "~/src/types/dtos/genre";

export default defineEventHandler(async (event) => {
    const body = await readBody<GenreDTO>(event);

    const genre: Prisma.GenreCreateInput = {
        ...body,
    };

    await prisma.genre.create({
        data: {
            ...genre,
        },
    });

    return { genre };
});
