export default defineEventHandler(async (event) => {
    const query = getQuery<{ supabaseId: string }>(event);

    const { supabaseId } = query;

    const user = await prisma.user.findFirst({
        where: { providerId: supabaseId },
        include: { person: true, Role: true },
    });

    return user;
});
