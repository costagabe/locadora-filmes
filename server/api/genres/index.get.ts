export default defineEventHandler(async (event) => {
    return (await prisma.genre.findMany()).map((genre) => ({
        id: genre.id,
        name: genre.name,
    }));
});
