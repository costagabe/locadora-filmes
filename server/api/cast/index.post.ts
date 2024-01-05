import { Prisma } from "@prisma/client";
import { CastDTO } from "~/src/types/dtos/cast";

export default defineEventHandler(async (event) => {
    const body = await readBody<CastDTO>(event);

    const actor: Prisma.ActorCreateInput = {
        firstName: body.firstName!,
        lastName: body.lastName!,
    };

    await prisma.actor.create({
        data: {
            ...actor,
        },
    });

    return { actor };
});
