export default defineEventHandler(async (event) => {
    return (await prisma.actor.findMany()).map((actor) => ({
        id: actor.id,
        name: `${actor.firstName} ${actor.lastName}`,
    }));
});
