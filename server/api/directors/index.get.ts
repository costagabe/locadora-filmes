export default defineEventHandler(async (event) => {
    return (await prisma.director.findMany()).map((director) => ({
        id: director.id,
        fullName: `${director.firstName} ${director.lastName}`,
        firstName: director.firstName,
        lastName: director.lastName,
    }));
});
