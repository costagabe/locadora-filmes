import { CastDTO } from "~/src/types/dtos/cast";

export default defineEventHandler(async (event) => {
    const body = await readBody<CastDTO>(event);

    const id = getRouterParam(event, "id");
    const actor = await prisma.actor.findFirst({
        where: { id },
    });

    if (!actor)
        throw createError({
            status: 404,
            message: "Atuante não encontrado",
        });

    Object.assign(actor, body);

    await prisma.actor.update({
        where: { id },
        data: {
            ...actor,
        },
    });

    return { actor };
});
